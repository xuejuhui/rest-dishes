const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const compression = require("compression");

const auth = require("./routes/api/auth");
const dishes = require("./routes/api/dishes");
const comments = require("./routes/api/comments");
const orders = require("./routes/api/orders");
const pro = require("./routes/api/pro");

const errorHandlers = require("./utils/errorHandlers");
const server = require("./graphql/graphqlServer");
const debug = require("debug")("server");

// initialize express
const app = express();
debug("hi", "do some work");
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression());
// app.use(passport.session());
require("./passport")(passport);

// Routes
app.get("/", (req, res) => {
  res.send("Page Ok");
});
app.use("/api/users", auth);
app.use(
  "/api/dishes",
  passport.authenticate("jwt", { session: false }),
  dishes
);
app.use(
  "/api/comments",
  passport.authenticate("jwt", { session: false }),
  comments
);
app.use(
  "/api/orders",
  passport.authenticate("jwt", { session: false }),
  orders
);

app.use("/api", pro);

app.use("/graphql", passport.authenticate("jwt", { session: false }));

// clientSideHandler come first, call next if check for serverSide
// errorHandlers function
app.use(errorHandlers.clientSideHandler);
app.use(errorHandlers.serverSideHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

server.applyMiddleware({ app, path: "/graphiql" });

module.exports = app;
