const mongoose = require("mongoose");
const key = require("../config/key").mongoURI;
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

mongoose.connect(
  key,
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", () => console.log("Connected!"))
  .on("error", error => {
    console.warn("Error : ", error);
  });

//Called hooks which runs before something.
