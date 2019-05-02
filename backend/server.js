const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const auth = require("./routes/api/auth");
const dishes = require("./routes/api/dishes");
const comments = require("./routes/api/comments");
const errorHandlers = require("./utils/errorHandlers");

// initialize express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(passport.session());
require("./passport")(passport);
// Routes
app.get("/", (req, res) => {
  res.send("Page Ok");
});
app.use("/api/users", auth);
app.use(
  "/api/dishes",
  // passport.authenticate("jwt", { session: false }),
  dishes
);
app.use(
  "/api/comments",
  passport.authenticate("jwt", { session: false }),
  comments
);

// clientSideHandler come first, call next if check for serverSide
// errorHandlers function
app.use(errorHandlers.clientSideHandler);
app.use(errorHandlers.serverSideHandler);

module.exports = app;
