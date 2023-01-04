const express = require("express");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/users");
const morgan = require("morgan");

const LOGIN_PORT = process.env.LOGIN_PORT || 3001;

app.listen(LOGIN_PORT, () => {
  console.log(`Server is running on port ${LOGIN_PORT}`);
  console.log(
    `To see the API documentation, please visit http://localhost:${LOGIN_PORT}/api-docs`
  );
});

// Connect to MongoDB
mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB ATLAS");
  })
  .catch((err) => console.log("Error: " + err));

const swaggerSpec = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Conexa Challenge docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${LOGIN_PORT}`,
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
app.use(express.json());

app.use(morgan("tiny"));

app.use("/api", users);

module.exports = app;
