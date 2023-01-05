const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/users");
const morgan = require("morgan");

const BUSINESS_PORT = process.env.BUSINESS_PORT || 3001;
const BUSINESS_HOST = process.env.BUSINESS_HOST || "localhost";

app.listen(BUSINESS_PORT, BUSINESS_HOST, () => {
  console.log(`Server is running on port ${BUSINESS_PORT}`);
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

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use("/api", users);

module.exports = app;
