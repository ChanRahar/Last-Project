const router = require("express").Router();
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");


router.route("/signup")
  .post(function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router.route("/login")
  .post(passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("/members");
    res.json({
      loggedIn: true,
      message: "WOOOO IT WORKED",
      username: req.user.username
    });
  });

// Route for logging user out
router.route("/logout")
  .get(function (req, res) {
    req.logout();
    res.redirect("/");
  });

// Route for getting some data about our user to be used client side
router.route("/user_data")
  .get(function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({ loggedIn: false });
    }
    else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        loggedIn: true
      });
    }
  });

module.exports = router;
