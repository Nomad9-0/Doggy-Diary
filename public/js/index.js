// Get references to page elements
var $dogName = $("#dog-name");
var $dogBirthdate = $("#dog-birthdate");
var $dogSex = $("#dog-sex");
var $dogBreed = $("#dog-breed");

var $dogHappiness = $("#dog-happiness");
var $dogEnergy = $("#dog-energy");
var $dogAppetite = $("#dog-appetite");
var $dogAffection = $("#dog-affection");
var $dogMessage = $("#dog-message");

var $submitDog = $("#submit-dog");
var $submitDiary = $("#submit-diary");
var $dogList = $("#dog-list");
var $diaryList = $("#diary-list");

// The API object contains methods for each kind of request we'll make
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
  }
};

// refreshDogs gets new dogs from the db and repopulates the list
// COPY ALL THIS BELOW AND CHANGE IT FOR THE DIARY
var refreshDogs = function() {
  API.getDogs().then(function(data) {
    var $dogs = data.map(function(dog) {
      var $a = $("<a>")
        .text(dog.dogName)
        .attr("href", "/dog/" + dog.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": dog.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $dogList.empty();
    $dogList.append($dogs);
  });
};

// handleFormSubmit is called whenever we submit a new dog
// Save the new dog to the db and refresh the list
var dogFormSubmit = function(event) {
  event.preventDefault();

  var dog = {
    dogName: $dogName.val().trim(),
    birthdate: $dogBirthdate.val().trim(),
    sex: $dogSex.val().trim(),
    breed: $dogBreed.val().trim()
  };

  if (!(dog.dogName && dog.birthdate && dog.sex && dog.breed)) {
    alert("You must enter your dog's info!");
    return;
  }

  API.saveDog(dog).then(function() {
    refreshDogs();
  });

  $dogName.val("");
  $dogBirthdate.val("");
  $dogSex.val("");
  $dogBreed.val("");
};

// handleDeleteBtnClick is called when an dog's delete button is clicked
// Remove the dog from the db and refresh the list
var dogDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDog(idToDelete).then(function() {
    refreshDogs();
  });
};

var refreshDiaries = function() {
  API.getDiaries().then(function(data) {
    var $diaries = data.map(function(diary) {
      var $a = $("<a>")
        .text(diary.dogName)
        .attr("href", "/diary/" + diary.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": diary.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $diaryList.empty();
    $diaryList.append($diaries);
  });
};

// handleFormSubmit is called whenever we submit a new dog
// Save the new dog to the db and refresh the list
var diaryFormSubmit = function(event) {
  event.preventDefault();

  var diary = {
    dogName: $dogName.val().trim(),
    happiness: $dogHappiness.val().trim(),
    energy: $dogEnergy.val().trim(),
    appetite: $dogAppetite.val().trim(),
    affection: $dogAffection.val().trim(),
    message: $dogMessage.val().trim()
  };

  if (
    !(
      diary.dogName &&
      diary.happiness &&
      diary.energy &&
      diary.appetite &&
      diary.affection
    )
  ) {
    alert("Please enter all value fields!");
    return;
  }

  API.saveDiary(diary).then(function() {
    refreshDiaries();
  });

  $dogName.val("");
  $dogHappiness.val("");
  $dogEnergy.val("");
  $dogAppetite.val("");
  $dogAffection.val("");
  $dogMessage.val("");
};

// handleDeleteBtnClick is called when an dog's delete button is clicked
// Remove the dog from the db and refresh the list
var diaryDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDiary(idToDelete).then(function() {
    refreshDiaries();
  });
};

// Add event listeners to the submit and delete buttons
$submitDog.on("click", dogFormSubmit);
$submitDiary.on("click", diaryFormSubmit);
$dogList.on("click", ".delete", dogDeleteBtnClick);
$diaryList.on("click", ".delete", diaryDeleteBtnClick);
