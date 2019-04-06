const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const dishes = require("./routes/api/dishes");
const passport = require("passport");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
const db = require("./config/key").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./passport")(passport);
app.use("/api/users", users);
app.use("/api/dishes", dishes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
