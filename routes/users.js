var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("passportapp", ["users"]);
var bcrypt = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Login Page - GET
router.get("/login", function(request, response) {
  response.render("login");
});

// Register Page - GET
router.get("/register", function(request, response) {
  response.render("register");
});

// Register Page - POST
router.post("/register", function(request, response) {
  // Get values
  var name = request.body.name;
  var email = request.body.email;
  var username = request.body.username;
  var password = request.body.password;
  var password2 = request.body.password2;

  // Validation
  request.checkBody("name", "Name is a required field").notEmpty();
  request.checkBody("email", "Email is a required field").notEmpty();
  request.checkBody("email", "Email is not entered correctly").isEmail();
  request.checkBody("username", "Username is a required field").notEmpty();
  request.checkBody("password", "Password is a required field").notEmpty();
  request
    .checkBody("password2", "Password do not match")
    .equals(request.body.password);

  // Check for errors
  var errors = request.validationErrors();

  if (errors) {
    console.log("Form has errors");
    response.render("register", {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = {
      name: name,
      email: email,
      username: username,
      password: password
    };
    bcrypt.genSalt(10, function(error, salt) {
      bcrypt.hash(newUser.password, salt, function(error, hash) {
        newUser.password = hash;
        db.users.insert(newUser, function(error, doc) {
          if (error) {
            response.send(error);
          }
          console.log("Successfully inserted document");

          // Success Message
          request.flash("Successfully added new user");

          // Redirect
          response.location("/");
          response.redirect("/");
        });
      });
    });
  }
});

module.exports = router;
