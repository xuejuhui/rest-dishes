let jwt = require("jsonwebtoken");
const key = require("../config/key");
const boom = require("boom");

module.exports.verifyToken = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return next(boom.unauthorized("No token provided."));
  }
  const token = bearerHeader.substring(6);
  jwt.verify(token, key.secretOrKey, function(err, decoded) {
    if (err) {
      return next(boom.unauthorized("Failed to authenticate token."));
    }
    req.user = decoded;
    next();
  });
};
