const router = require("express").Router();
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt-nodejs");


router
  .route("/signup")
  .post(function (req, res) {
    newUser = req.body
    newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10), null);
    db.User
      .create(newUser)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router
  .route("/login")
  .post(passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("/members");
    res.json({
      loggedIn: true,
      username: req.user.username
    });
  });

// Route for logging user out
router
  .route("/logout")
  .get(function (req, res) {
    req.logout();
    res.redirect("/");
  });

// Route for getting some data about our user to be used client side
router
  .route("/user_data")
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

// All users test route
router
  .route("/allUsers")
  .get(function (req, res) {
    db.User
      .find(req.query)
      .sort({ net: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

router
  .route("/allUsers/:username")
  .get(function (req, res) {
    db.User
      .findOne({ "username": req.params.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
  .put(function (req, res) {
    console.log(req.body)
    db.User
      .findOneAndUpdate(
        { 
          "username": req.params.username
        }, 
        {
          $set: req.body
        }
        )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  
module.exports = router;
