const jwt = require("jsonwebtoken");

class Authenticate {
  static validate(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(501).json({
        message: "No token provided",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  }
}

module.exports = {
  Authenticate,
};
