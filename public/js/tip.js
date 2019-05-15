var $dogName = $("#dog-name");

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
  getDiaries: function(dog) {
    return $.ajax({
      url: "api/diaries" + dog,
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

function dogTip(dog) {
  API.getDiaries(dog).then(function(data) {
    var $diary = data.map(function(diary) {
      console.log(diary);
    });
    return $diary;
  });
}

function selectDog() {
  var dog = $dogName.val();
  dogTip(dog);
}

$("#select-dog").on("click", selectDog);
