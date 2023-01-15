const jwt = require("jsonwebtoken");

class TokenManagement {
  static tokenSign(user) {
    const token = jwt.sign(
      {
        user: user.email,
      },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }
}

module.exports = TokenManagement;
