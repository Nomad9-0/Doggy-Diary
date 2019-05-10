var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Dog.findAll({}).then(function(dbDogs) {
      res.render("index", {
        msg: "Welcome!",
        dogs: dbDogs
      });
    });
  });

  // Load dog page and pass in an dog by id
  app.get("/dog/:id", function(req, res) {
    db.Dog.findOne({ where: { id: req.params.id } }).then(function(dbDog) {
      res.render("dog", {
        dog: dbDog
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
