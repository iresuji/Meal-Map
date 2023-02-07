console.log("test");

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  console.log("Hello");

  let city = $("#citySearch").val();

  console.log(city);

  // First query to get locationID
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=" +
      city,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "60cf695559msh3d7df9863cf7bb1p1b0f39jsnfd5b1c8804fe",
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
        "X-RapidAPI-Key": "60cf695559msh3d7df9863cf7bb1p1b0f39jsnfd5b1c8804fe",
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
    <p clss='nameRest'>${nameRest}</p>
    <p class='city'>${cityRest}</p>
    <p class='typeFood'>${typeFood}</p>
    <p class='rate'>${rateRest}</p>
    <button class='findmore' onclick="discover(this)" data-restaurantName="${nameRest}" data-cityRest= "${cityRest}" >"Find out more"</button>
    </div>`
        );
      }
    });
  });
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
    });
  });
}
