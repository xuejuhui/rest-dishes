const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const dishes = require("./routes/api/dishes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./config/key").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./passport")(passport);
app.use("/api/users", users);
app.use("/api/dishes", dishes);

app.use((err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.payload.statusCode).json(err);
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
