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

var dogName = "Rex";
function dogDiary() {
  API.getDiaries().then(function(data) {
    data.map(function(diary) {
      for (var i = 0; i < diary.length; i++) {
        if (diary.dogName === dogName) {
          console.log(diary.message);
        }
      }
    });
  });
}

dogDiary();
