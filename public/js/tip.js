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

var dogName = "Slippy";
function dogDiary() {
  API.getDiaries().then(function(data) {
    data.map(function(diary) {
      var dog = dogName.toLocaleLowerCase();
      var dogDataName = diary.dogName.toLocaleLowerCase();
      console.log(diary);
      if (dogDataName === dog) {
        var totalStats =
          diary.happiness + diary.energy + diary.appetite + diary.affection;
        console.log(totalStats);
        if (totalStats > 15) {
          console.log("Happy Puppy");
        } else if (totalStats < 15 && totalStats > 8) {
          console.log("Needs attention");
        } else {
          console.log("Uh oh!");
        }
      }
    });
  });
}

function averageAll(diary) {

}

dogDiary();
