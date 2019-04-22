const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
const boom = require("boom");
// const Joi = require("joi");

const validation = require("../utils/joiSchemas/index");
const mailer = require("../utils/mailer");
const db = require("../models/index");
const key = require("../config/key");

const register = async (req, res, next) => {
  const current = await db.User.findOne({ email: req.body.email });
  if (current) {
    return next(boom.unauthorized("Email already exist"));
  }
  const newUser = new db.User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  validation.userSchema.validate(newUser, (err, value) => {
    if (err) return next(boom.notFound(err.details[0].message));
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
};

const login = async (req, res, next) => {
  const current = await db.User.findOne({ email: req.body.email });
  if (!current) {
    return next(boom.badRequest("Email not found"));
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
    return next(boom.notFound("Incorrect password"));
  }
};

const forgotpassword = async (req, res, next) => {
  try {
    const current = await db.User.findOne({ email: req.body.email });
    const token = uuidv1();
    if (!current) {
      return next(boom.badRequest("Email not found"));
    }
    const updateResponse = await db.User.updateOne(current, {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000
    });
    let mailOptions = {
      to: req.body.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.

      Please click on the following link, or paste this into your browser to complete the process:

       ${req.headers.origin}/reset/${token}

       If you did not request this, please ignore this email and your password will remain unchanged.`
    };
    const from = { from: "legumoyaka@the-first.email" };
    mailer.sendEmail(mailOptions, from);
    res.json({ message: "Email email has been sent" });
  } catch (e) {
    return next(boom.badRequest("Error"));
  }
};

const checkToken = async (req, res, next) => {
  try {
    const current = await db.User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!current) {
      return next(
        boom.badRequest("Password reset token is invalid or has expired.")
      );
    }
    res.json(current);
  } catch (e) {
    console.log(e);
  }
};

const resetToken = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const current = await db.User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!current) {
      return next(
        boom.badRequest("Password reset token is invalid or has expired.")
      );
    }
    const updateResponse = await db.User.updateOne(current, {
      password: hash,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });
    console.log(updateResponse);
    res.json({ message: "Your password has been reset successfully!" });
  } catch (e) {
    console.log(e);
    return next(boom.badRequest("Error"));
  }
};

module.exports = { register, login, resetToken, checkToken, forgotpassword };
