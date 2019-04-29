const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
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
require("./passport")(passport);

// Routes
app.get("/", (req, res) => {
  res.send("Page Ok");
});
app.use("/api/users", users);
app.use("/api/dishes", dishes);
app.use("/api/comments", comments);

// clientSideHandler come first, call next if check for serverSide
// errorHandlers function
app.use(errorHandlers.clientSideHandler);
app.use(errorHandlers.serverSideHandler);

module.exports = app;
