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

  app.get("/diary", function(req, res) {
    db.Diary.findAll({}).then(function(dbDiaries) {
      res.render("diary", {
        diaries: dbDiaries
      });
    });
  });

  /* app.get("/diary/:input", function(req, res) {
    db.Diary.findAll({ where: { dogName: req.params.input } }).then(function(
      dbDiaries
    ) {
      res.render("choose", {
        diaries: dbDiaries
      });
    });
  });
 */
  // Load dog page and pass in an dog by id
  app.get("/dog/:id", function(req, res) {
    db.Dog.findOne({ where: { id: req.params.id } }).then(function(dbDog) {
      res.render("dog", {
        dog: dbDog
      });
    });
  });

  /*  app.get("/diary/:id", function(req, res) {
    db.Diary.findOne({ where: { id: req.params.id } }).then(function(dbDiary) {
      res.render("", {
        diary: dbDiary
      });
    });
  }); */

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
