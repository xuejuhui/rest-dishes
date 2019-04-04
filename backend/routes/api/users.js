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
  try {
    const current = await User.findOne({ email: req.body.email });
    const token = uuidv1()
    if(!current){
        return res.status(400).json({ message: "Email not found" });
    }
    const updateResponse = await User.updateOne(current,{ resetPasswordToken:token, resetPasswordExpires:Date.now() + 3600000});
    console.log(updateResponse)
    let mailOptions = {
      to: req.body.email,
      subject: 'Node.js Password Reset',
     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
       'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
       '' + req.headers.origin + '/reset/' + token + '\n\n' +
       'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    const from = {from:"legumoyaka@the-first.email"}
    mailer.sendEmail(mailOptions,from)
    res.json({emailed:true})
  } catch (e) {
    console.log(e)
  }

})



router.get("/reset/:token", async (req, res) =>{
  try {
    const current = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires:{$gt: Date.now()} });
    if(!current){
        return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }
    res.json(current)
  } catch (e) {
    console.log(e)
  }

})

router.put("/reset/:token", async (req, res) =>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const current = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires:{$gt: Date.now()} });
    if(!current){
        return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }
    const updateResponse = await User.updateOne(current,{password:hash});
    console.log(updateResponse)
    res.json(current)
  } catch (e) {
    console.log(e)
  }

})




module.exports = router;
