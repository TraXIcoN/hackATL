const jwt = require("jsonwebtoken"); // NPM module
const config = require("./config.js"); // Configuration file
let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove the word 'Bearer '
  }
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "The token is not valid.",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Token unavailable.",
    });
  }
};
module.exports = {
  checkToken: checkToken,
};
