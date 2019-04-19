const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const dishes = require("./routes/api/dishes");
const errorHandlers = require("./utils/errorHandlers");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./passport")(passport);

app.use("/api/users", users);
app.use("/api/dishes", dishes);

// clientSideHandler come first, call next if check for serverSide
// errorHandlers function
app.use(errorHandlers.clientSideHandler);
app.use(errorHandlers.serverSideHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
