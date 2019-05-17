let jwt = require("jsonwebtoken");
const config = require("config");
const boom = require("boom");

module.exports.verifyToken = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return next(boom.unauthorized("No token provided."));
  }
  const token = bearerHeader.substring(7);
  jwt.verify(token, config.get("app.jwtScretKey"), function(err, decoded) {
    if (err) {
      return next(boom.unauthorized("Failed to authenticate token."));
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};
