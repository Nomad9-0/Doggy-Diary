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
// var $diaryList = $("#diary-list");

var currentDog = $(".dog-name").text();
console.log(currentDog);

//Showing the server where to look for images
// app.use(express.static("public"));

// The API object contains methods for each kind of request we'll make
var API = {
  saveDog: function (dog) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/dogs",
      data: JSON.stringify(dog)
    });
  },
  getDogs: function () {
    return $.ajax({
      url: "api/dogs",
      type: "GET"
    });
  },
  deleteDog: function (id) {
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
  getDiaries: function () {
    return $.ajax({
      url: "api/diaries",
      type: "GET"
    });
  },
  deleteDiary: function (id) {
    return $.ajax({
      url: "api/diaries/" + id,
      type: "DELETE"
    });
  }
};

// refreshDogs gets new dogs from the db and repopulates the list
// COPY ALL THIS BELOW AND CHANGE IT FOR THE DIARY
var refreshDogs = function () {
  API.getDogs().then(function (data) {
    var $dogs = data.map(function (dog) {
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
var dogFormSubmit = function (event) {
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

  API.saveDog(dog).then(function () {
    refreshDogs();
  });

  $dogName.val("");
  $dogBirthdate.val("");
  $dogSex.val("");
  $dogBreed.val("");
};

// handleDeleteBtnClick is called when an dog's delete button is clicked
// Remove the dog from the db and refresh the list
var dogDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDog(idToDelete).then(function () {
    refreshDogs();
  });
};

/* var refreshDiaries = function () {
  API.getDiaries().then(function (data) {
    var $diaries = data.map(function (diary) {
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
 */
// handleFormSubmit is called whenever we submit a new dog
// Save the new dog to the db and refresh the list
var diaryFormSubmit = function (event) {
  event.preventDefault();
  
  var diary = {
    dogName: currentDog,
    happiness: $dogHappiness.val().trim(),
    energy: $dogEnergy.val().trim(),
    appetite: $dogAppetite.val().trim(),
    affection: $dogAffection.val().trim(),
    message: $dogMessage.val().trim()
  };

  console.log(diary);

  if (!(diary.happiness && diary.energy && diary.appetite && diary.affection)) {
    alert("Please enter all value fields!");
    return;
  }

  API.saveDiary(diary).then(function() {
    // refreshDiaries();
    // $dogName.val("");
    $dogHappiness.val("");
    $dogEnergy.val("");
    $dogAppetite.val("");
    $dogAffection.val("");
    $dogMessage.val("");
  });
};

// handleDeleteBtnClick is called when an dog's delete button is clicked
// Remove the dog from the db and refresh the list
var diaryDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDiary(idToDelete).then(function () {
    refreshDiaries();
  });
};

// Add event listeners to the submit and delete buttons
$submitDog.on("click", dogFormSubmit);
$submitDiary.on("click", diaryFormSubmit);
$dogList.on("click", ".delete", dogDeleteBtnClick);
// $diaryList.on("click", ".delete", diaryDeleteBtnClick);

// Chart
//var diary= require('../../models/diary');
var myChart = document.getElementById("myChart").getContext("2d");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontsize = 18;
Chart.defaults.global.defaultFontColor = "#777";

new Chart(myChart, {
  type: "line",
  data: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets: [
      {
        label: "Behavior",
        // Happiness = 4, Energy = 3, Appetite = 2, Affection = 1
        // will take average and post avg for the day.
        data: [10, 6, 9, 7, 5, 8, 3],
        borderColor: "blue",
        borderWidth: 1,
        hoverBorderWidth: 3,
        hoverBorderColor: "#000"
      }
    ]
  },
  options: {
    title: {
      display: true,
      fontSize: 25
    },
    legend: {
      position: "right",
      labels: {
        fontColor: "#000"
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  }
});

// Breed Data
var $breed_select = $('select.breed_select');
$breed_select.change(function () {
  var id = $(this).children(":selected").attr("id");
  getDogByBreed(id)
});
// Load all the Breeds
function getBreeds() {
  ajax_get('https://api.thedogapi.com/v1/breeds', function (data) {
    populateBreedsSelect(data)
  });
}
// Put the breeds in the Select control
function populateBreedsSelect(breeds) {
  $breed_select.empty().append(function () {
    var output = '';
    $.each(breeds, function (key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}
// triggered when the breed select control changes
function getDogByBreed(breed_id) {
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  ajax_get('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function (data) {

    if (data.length == 0) {
      // if there are no images returned
      clearBreed();
      $("#breed_data_table").append("<tr><td>Sorry, no Image for that breed yet</td></tr>");
    } else {
      //else display the breed image and data
      displayBreed(data[0])
    }
  });
}
// clear the image and table
function clearBreed() {
  $('#breed_image').attr('src', "");
  $("#breed_data_table tr").remove();
}
// display the breed image and data
function displayBreed(image) {
  $('#breed_image').attr('src', image.url);
  $("#breed_data_table tr").remove();

  var breed_data = image.breeds[0]
  $.each(breed_data, function (key, value) {
    // as 'weight' and 'height' are objects that contain 'metric' and 'imperial' properties, just use the metric string
    if (key == 'weight' || key == 'height') value = value.metric
    // add a row to the table
    $("#breed_data_table").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  });
}

// make an Ajax request
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
// call the getBreeds function which will load all the Dog breeds into the select control
getBreeds();

// Diary
$("#homeD").hide();
$('#btnDiary').on('click', function(event) {
  event.preventDefault();
  $('#homeD').toggle();
});

$('#btnHome').on('click', function(event) {
  event.preventDefault();
  location.href = "/";
});
