const UserSchema = require("../models/user");

class UserController {
  static async getAllUsers(req, res) {
    const { page, limit, email } = req.query;
    const filter = email
      ? { email: { $regex: new RegExp(email), $options: "i" } }
      : {};
    // pagination
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      select: "-password",
      sort: { createdAt: -1 },
    };
    try {
      //dont show de password
      const users = await UserSchema.paginate(filter, options);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
