var express = require("express");
var router = express.Router();

router.get("/", ensureAuthenticated, function(request, response) {
  response.render("index");
});

function ensureAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect("/users/login");
}

module.exports = router;
