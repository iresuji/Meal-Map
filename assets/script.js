console.log("test");

var initialSearch = localStorage.getItem("city")
if (initialSearch && initialSearch !== "") {
  $("#citySearch").val(initialSearch);
  search(initialSearch)
}

function search(city) {
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=" +
      city,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "75980977d5msh3aa264572f31770p12b67cjsn503a854eac7f",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    let searchId = response.data[0].locationId;
    console.log(searchId);
    // Second query to get restaurantID
    const settings2 = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=" +
        searchId,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "75980977d5msh3aa264572f31770p12b67cjsn503a854eac7f",
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
      },
    };
    $.ajax(settings2).done(function (response) {
      console.log(response);
      for (i = 0; response.data.data.length > i; i++) {
        var listOfRest = response.data.data[i];
        var typeFood = listOfRest.establishmentTypeAndCuisineTags[0];
        var nameRest = listOfRest.name;
        var cityRest = listOfRest.parentGeoName;
        var imageRest = listOfRest.heroImgUrl;
        var rateRest = listOfRest.averageRating;
        var restaurantId = listOfRest.restaurantsId;

        // adds Restaurant options on the HTML
        $(".scroll-images").append(
          `<div class="child">
    <img class="child-img" src="${imageRest}" alt="image" />
    <p class='nameRest'>${nameRest}</p>
    <p class='city'>${cityRest}</p>
    <p class='typeFood'>${typeFood}</p>
    <p class='rate'>${rateRest}</p>
    <button class='findmore' onclick="discover(this)" data-restaurantName="${nameRest}" data-cityRest= "${cityRest}" >"Find out more"</button>
    </div>`
        );
      }
    });
  });
}

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  console.log("Hello");

  let city = $("#citySearch").val();

  localStorage.setItem("city", city);

  search(city);

  console.log(city);

  // First query to get locationID

});

function discover(element) {
  console.log($(element));
  var currentRest = encodeURIComponent($(element).attr("data-restaurantName"));
  var currentCityRest = encodeURIComponent($(element).attr("data-cityRest"));
  // query to get Restaurant ID  business_id
  console.log(
    `https://local-business-data.p.rapidapi.com/search?query=${currentRest}%20restaurant%20${currentCityRest}&limit=20&lat=37.359428&lng=-121.925337&zoom=13&region=us&language=en`
  );
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://local-business-data.p.rapidapi.com/search?query=${currentRest}%20restaurant%20${currentCityRest}&limit=20&lat=37.359428&lng=-121.925337&zoom=13&region=us&language=en`,

    method: "GET",
    headers: {
      "X-RapidAPI-Key": "68792a8c29msh7c9d9f267e046f3p104235jsne344dbf0c883",
      "X-RapidAPI-Host": "local-business-data.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    var statusRest = response.data[0].business_status;
    var aboutRest = response.data[0].about;
    var verifiedRest = response.data[0].verified;
    var fullNameRest = response.data[0].name;
    var addressRest = response.data[0].address;
    var phoneRest = response.data[0].phone_number;
    var websiteRest = response.data[0].website;




    $(".restDetails").append(
      `<div class="child">

        <p class='typeFood'>${verifiedRest}</p>
        <p class='nameRest'>${statusRest}</p>
        <p class='city'>${aboutRest}</p>
        <p class='rate'>${fullNameRest}</p>
        <p class='rate'>${addressRest}</p>
        <p class='rate'>${phoneRest}</p>
        <p class='rate'>${websiteRest}</p>
        <button class='bookRest'" >"Book Restaurant"</button>
        </div>`
    )



    //   restaurant photos  business_id  to get photos
    var businessId = response.data[0].business_id;
    const settings2 = {
      async: true,
      crossDomain: true,
      url:
        "https://local-business-data.p.rapidapi.com/business-photos?business_id=" +
        businessId +
        "&limit=5&region=us",
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "68792a8c29msh7c9d9f267e046f3p104235jsne344dbf0c883",
        "X-RapidAPI-Host": "local-business-data.p.rapidapi.com",



      },
    };

    $.ajax(settings2).done(function (response) {
      console.log(response);
      for (i = 0; response.data.length > i; i++) {
        var pictureUrlRest = response.data[i].photo_url;

        // adds Restaurant Images to the selected Restaurant 
        $(".restImages").append(
          `<div class="child">
    <img class="child-img" src="${pictureUrlRest}" alt="image" />`)
      };

    });
  });
}

//Show modal on opening the page

setTimeout(function () {
  $('#newsletter').modal('show');
}, 2000);
