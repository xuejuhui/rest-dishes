const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const key = require("../../config/key");

// router.post('/register', (req, res) => {
//     User.findOne({ email: req.body.email }).then(user => {
//         if (user) {
//             return res.status(400).json({ message: "Email already exist" })
//         }
//     })
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     })

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) throw err;
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             console.log(hash)
//             newUser.password = hash;
//         })
//     })
// })

router.post("/register", async (req, res) => {
  const current = await User.findOne({ email: req.body.email });
  if (current) {
    return res.status(400).json({ message: "Email already exist" });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const userResponse = await newUser.save()
    res.json(userResponse)
  } catch (err) {
    throw err;
  }

});

router.post("/login", async (req, res) => {
  const current = await User.findOne({ email: req.body.email });
  if (!current) {
    return res.status(400).json({ message: "Email not found" });
  }
  const isMatch = await bcrypt.compare(req.body.password, current.password);
  const user = { id: current._id, name: current.name };
  if (isMatch) {
    try {
      const token = await jwt.sign(user, key.secret, { expiresIn: 31556926 });
      res.json({
        success: true,
        token: "Bearer" + token
      });
    } catch (error) {
      throw error;
    }
  } else {
    res.status(404).json({ message: "Incorrect password" });
  }
});

module.exports = router;
