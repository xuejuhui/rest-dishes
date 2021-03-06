const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const db = require("../../models/index");

router.get("/pro/:id", async (req, res) => {
  const userId = req.params.id;
  const token = uuid();
  const currentUser = await db.User.findOne({ _id: userId }).populate(
    "referalLink"
  );
  const link = `${req.headers.host}/api/refer/${token}`;
  if (currentUser && currentUser.referalLink.length <= 0) {
    const newReferalLink = new db.RerferalLink({
      token,
      link,
      user_id: userId,
      timeLeft: Date.now() + 604800000
    });
    const newReferalLinkResponse = await newReferalLink.save();
    currentUser.referalLink.push(newReferalLinkResponse._id);
    await currentUser.save();
    return res.json(newReferalLinkResponse);
  }
  res.json(currentUser.referalLink);
});
router.get("/refer/:id", async (req, res) => {
  const user = await db.RerferalLink.findOne({ token: req.params.id }).populate(
    { path: "user_id", select: ["_id", "email"] }
  );
  res.send(user);
});

router.post("/refer", async (req, res) => {
  const email = req.body.email;
  const referalcheck = await db.RerferalLink.findOne({ token: req.body.token });
  if (referalcheck.userArray.includes(email)) {
    return res.json({ message: "you already clicked" });
  }
  const amount = Math.random() * Math.random() * 2;
  const user = await db.RerferalLink.findOneAndUpdate(
    { token: req.body.token },
    {
      $push: { userArray: email },
      $inc: { userCount: 1, currentPrice: amount }
    },
    { new: true, useFindAndModify: false }
  );
  res.send(user);
});

router.get("/route/:dynamicRoute", async (req, res) => {
  try {
    const redirect = await db.RedirectRoute.findOne({
      redirectFrom: req.params.dynamicRoute
    });
    let redirectLink = redirect.redirectTo;
    if (!redirectLink.startsWith("/")) {
      redirectLink = `/${redirectLink}`;
    }
    res.redirect(redirectLink);
  } catch (e) {
    console.log(e);
  }
});
router.post("/route", async (req, res) => {
  try {
    const redirect = await db.RedirectRoute.findOneAndUpdate(
      {
        redirectFrom: req.body.redirectFrom
      },
      { redirectTo: req.body.redirectTo },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false
      }
    );
    res.json(redirect);
  } catch (e) {
    console.log(e);
  }
});
router.get("/route", async (req, res) => {
  try {
    const redirect = await db.RedirectRoute.find();
    res.json(redirect);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
