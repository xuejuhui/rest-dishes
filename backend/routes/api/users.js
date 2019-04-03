const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const key = require("../../config/key");
const uuidv1 = require('uuid/v1');
const mailer = require("../../utils/mailer")

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
    const userResponse = await newUser.save();
    const user = { id: userResponse._id, name: userResponse.name };
    const token = await jwt.sign(user, key.secretOrKey, {
      expiresIn: 31556926
    });
    userResponse._doc.token = token;
    res.json(userResponse);
  } catch (err) {
    console.log(err);
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
      const token = await jwt.sign(user, key.secretOrKey, {
        expiresIn: 31556926
      });
      res.json({
        success: true,
        token: "Bearer" + token
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).json({ message: "Incorrect password" });
  }
});

router.post("/forgotpassword", async (req, res) =>{
  console.log(req.body.email)
  console.log(uuidv1())
  let mailOptions = {
    to: req.body.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };
  const from = {from:"legumoyaka@the-first.email"}
  mailer.sendEmail(mailOptions,from)
})

module.exports = router;
