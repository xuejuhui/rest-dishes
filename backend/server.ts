import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import passport from "passport";
import path from "path";

import auth from "./routes/api/auth";
import comments from "./routes/api/comments";
import dishes from "./routes/api/dishes";
import orders from "./routes/api/orders";
import pro from "./routes/api/pro";

import debug from "debug";
import server from "./graphql/graphqlServer";
import errorHandlers from "./utils/errorHandlers";

const serverdebug = debug("server");
// initialize express
const app = express();
serverdebug("hi", "do some work");
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression());
// app.use(passport.session());
import pass from "./passport";
pass(passport);
// Routes
// app.get("/", (req, res) => {
//   res.send("Page Ok");
// });
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
if (process.env.NODE_ENV === "staging") {
  console.log("staging");
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

server.applyMiddleware({ app, path: "/graphiql" });

module.exports = app;
