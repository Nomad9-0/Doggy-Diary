var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/dogs", function(req, res) {
    db.Dog.findAll({}).then(function(dbDogs) {
      res.json(dbDogs);
    });
  });

  // Create a new example
  app.post("/api/dogs", function(req, res) {
    db.Dog.create(req.body).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  // Delete an example by id
  app.delete("/api/dogs/:id", function(req, res) {
    db.Dog.destroy({ where: { id: req.params.id } }).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  app.get("/api/diary", function(req, res) {
    db.Diary.findAll({}).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });

  app.post("/api/diary", function(req, res) {
    db.Diary.create(req.body).then(function(dbDiary) {
      res.json(dbDiary);
    });
  });
};
