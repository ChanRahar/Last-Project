const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function (email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({ email: email }).then(function (dbUser) {
      // // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
      // validatePassword = (password) => {
      //   bcrypt.compareSync(password, this.password)
      // }

      // If there's no user with the given username
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given username, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) { // TODO REMOVE BAD SECURITY AND PLAINTEXT PASSWORDS
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
