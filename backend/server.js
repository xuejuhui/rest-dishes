"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
var auth_1 = __importDefault(require("./routes/api/auth"));
var comments_1 = __importDefault(require("./routes/api/comments"));
var dishes_1 = __importDefault(require("./routes/api/dishes"));
var orders_1 = __importDefault(require("./routes/api/orders"));
var pro_1 = __importDefault(require("./routes/api/pro"));
var debug_1 = __importDefault(require("debug"));
var graphqlServer_1 = __importDefault(require("./graphql/graphqlServer"));
var errorHandlers_1 = __importDefault(require("./utils/errorHandlers"));
var serverdebug = debug_1.default("server");
// initialize express
var app = express_1.default();
serverdebug("hi", "do some work");
// Middleware
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use(compression_1.default());
// app.use(passport.session());
var passport_2 = __importDefault(require("./passport"));
passport_2.default(passport_1.default);
// Routes
// app.get("/", (req, res) => {
//   res.send("Page Ok");
// });
app.use("/api/users", auth_1.default);
app.use("/api/dishes", passport_1.default.authenticate("jwt", { session: false }), dishes_1.default);
app.use("/api/comments", passport_1.default.authenticate("jwt", { session: false }), comments_1.default);
app.use("/api/orders", passport_1.default.authenticate("jwt", { session: false }), orders_1.default);
app.use("/api", pro_1.default);
app.use("/graphql", passport_1.default.authenticate("jwt", { session: false }));
// clientSideHandler come first, call next if check for serverSide
// errorHandlers function
app.use(errorHandlers_1.default.clientSideHandler);
app.use(errorHandlers_1.default.serverSideHandler);
if (process.env.NODE_ENV === "staging") {
    console.log("staging");
}
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/build")));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}
graphqlServer_1.default.applyMiddleware({ app: app, path: "/graphiql" });
module.exports = app;
