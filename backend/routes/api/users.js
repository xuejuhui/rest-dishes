const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const key = require("../../config/key");
const uuidv1 = require('uuid/v1');
const mailer = require("../../utils/mailer")

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
    let mailOptions = {
      to: req.body.email,
      subject: 'Password Reset',
     text:
     `You are receiving this because you (or someone else) have requested the reset of the password for your account.

      Please click on the following link, or paste this into your browser to complete the process:

       ${req.headers.origin}/reset/${token}

       If you did not request this, please ignore this email and your password will remain unchanged.`
    };
    const from = {from:"legumoyaka@the-first.email"}
    mailer.sendEmail(mailOptions,from)
    res.json({ message: "Email email has been sent" })
  } catch (e) {
    return res.status(400).json({ message: "Error" });
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
  console.log(req.body,req.params)
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const current = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires:{$gt: Date.now()} });
    if(!current){
        return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }
    console.log(current)
    const updateResponse = await User.updateOne(current,{password:hash,resetPasswordToken:null, resetPasswordExpires:null});
    res.json({ message: "Your password has been reset successfully!" })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: "Error" });
  }

})




module.exports = router;
