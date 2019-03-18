var express = require("express");
var router = express.Router();

// Login Page - GET
router.get("/login", function(request, response) {
  response.render("login");
});

// Register Page - GET
router.get("/register", function(request, response) {
  response.render("register");
});

module.exports = router;
