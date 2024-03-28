const passport = require("passport");
const User = require("./models/passModel");
const LocalStrategy = require("passport-local").Strategy;

exports.intitializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);
        if (user.password !== password) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
  
  passport.serializeUser(async (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ id });
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/login");
};
