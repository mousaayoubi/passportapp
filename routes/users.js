var express = require("express");
var router = express.Router();

// Login Page - GET
router.get("/login", function(request, response) {
  response.send("LOGIN");
});

// Register Page - GET
router.get("/register", function(request, response) {
  response.send("REGISTER");
});

module.exports = router;
