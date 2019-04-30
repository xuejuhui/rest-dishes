const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("./models/index");
const key = require("./config/key");
const passport = require("passport");
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.secretOrKey;

const passStrag = passport => {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      db.User.findById(jwtPayload.id)
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

module.exports = passStrag;
