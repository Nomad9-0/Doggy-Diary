// Get references to page elements
var $dogName = $("#dog-name");
var $dogBirthdate = $("#dog-birthdate");
var $dogSex = $("#dog-sex");
var $dogBreed = $("#dog-breed");
var $submitBtn = $("#submit");
var $dogList = $("#dog-list");

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
  }
};

// refreshDogs gets new dogs from the db and repopulates the list
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
var handleFormSubmit = function(event) {
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
};

// handleDeleteBtnClick is called when an dog's delete button is clicked
// Remove the dog from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDog(idToDelete).then(function() {
    refreshDogs();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$dogList.on("click", ".delete", handleDeleteBtnClick);
