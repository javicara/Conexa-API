const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const tokenManagment = require("../helpers/tokenManagement");
const axios = require("axios");
const user = require("../models/user");

class UserController {
  static async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const saltRounds = 10;
      const user = await UserSchema.create({
        email,
        password: await bcrypt.hash(password, saltRounds),
      });
      res.status(201).json({
        message: `User ${user.email} created`,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserSchema.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "User not found",
          status: 401,
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
          status: 401,
        });
      }
      const token = tokenManagment.tokenSign(user);
      res.status(200).json({
        message: "User logged in",
        token,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllUsers(req, res) {
    //
    const { page, limit, email } = req.query;
    // filter by email if email is provided and no case sensitive
    try {
      let users = await axios.get("http://localhost:3002/api/users", {
        headers: {
          Authorization: req.headers.authorization,
          "content-type": "application/json",
        },
        params: {
          page,
          limit,
          email,
        },
      });
      users = users.data.docs;
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
