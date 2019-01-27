const express = require("express");
var session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8801;
const app = express();
const apiRoutes = require("./routes/apiRoutes");

// middleware for parsing body on post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setup passport
app.use(session({ secret: "onlinegame", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Use apiRoutes
app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/game-userdb", { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
