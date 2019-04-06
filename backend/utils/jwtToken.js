let jwt = require("jsonwebtoken");
const key = require("../config/key");

module.exports.verifyToken = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (!bearerHeader) {
    return res.status(403).json({ message: "No token provided." });
  }
  const token = bearerHeader.substring(6);
  console.log(token);
  jwt.verify(token, key.secretOrKey, function(err, decoded) {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token." });
    console.log(decoded);
    next();
  });
};
