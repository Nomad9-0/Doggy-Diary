var API = {
  saveDog: function(dog) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/dogs",
      data: JSON.stringify(dog)
    });
  },
  getDogs: function() {
    return $.ajax({
      url: "api/dogs",
      type: "GET"
    });
  },
  deleteDog: function(id) {
    return $.ajax({
      url: "api/dogs/" + id,
      type: "DELETE"
    });
  },
  saveDiary: function(diary) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/diaries",
      data: JSON.stringify(diary)
    });
  },
  getDiaries: function() {
    return $.ajax({
      url: "api/diaries",
      type: "GET"
    });
  },
  deleteDiary: function(id) {
    return $.ajax({
      url: "api/diaries/" + id,
      type: "DELETE"
    });
  }
};

var dogChoice = "Slippy";
function dogDiary(dog) {
  API.getDiaries().then(function(data) {
    var allTotalStats = [];
    var dogName = dog.toLowerCase();
    data.map(function(diary) {
      var dogDataName = diary.dogName.toLowerCase();
      console.log(diary);
      if (dogDataName === dogName) {
        var totalStats =
          diary.happiness + diary.energy + diary.appetite + diary.affection;
        allTotalStats.push(totalStats);
      }
    });
    console.log(allTotalStats);
  });
}

/* function checkStats (stats) {
  if (stats.length > 1) {
    for (var i = 0; i < stats.length; i++) {

    }
  }
}
 */
dogDiary(dogChoice);
