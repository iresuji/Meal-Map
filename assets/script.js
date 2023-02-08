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
      "X-RapidAPI-Key": "cc8ec927b3mshd52fa524ced1981p1f583ajsnd52acca28ce6",
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
        "X-RapidAPI-Key": "cc8ec927b3mshd52fa524ced1981p1f583ajsnd52acca28ce6",
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
          `<div class="child cardOptions">
          <div class="imageRestCard"><img class="child-img" src="${imageRest}" alt="image" /></div>
          <p class='nameRest' style="color: whitesmoke; display: flex; justify-content: center;">${nameRest}</p>
          <p class='city' style="color: whitesmoke; display: flex; justify-content: center;">${cityRest}</p>
          <p class='typeFood' style="color: whitesmoke; display: flex; justify-content: center;">${typeFood}</p>
          <p class='rate' style="color: whitesmoke; display: flex; justify-content: center;">${rateRest}</p>
          <button class='findmore btn btn-outline-success my-2 my-sm-0' style="margin: 0 auto; display: flex; justify-content: center;" onclick="discover(this)" data-restaurantName="${nameRest}" data-cityRest= "${cityRest}" >"Find out more"</button>
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

    var statusRest = response.data[0].business_status;
    var aboutRest = response.data[0].about.summary;
    var verifiedRest = response.data[0].verified;
    var fullNameRest = response.data[0].name;
    var addressRest = response.data[0].address;
    var phoneRest = response.data[0].phone_number;
    var websiteRest = response.data[0].website;

    $(".restDetails").append(
      `<div class="child cardOptions">

      <h5 class="card-title typeFood  style="color: whitesmoke; display: flex; justify-content: center;">${verifiedRest}</h5>
      <p class="card-text nameRest  style="color: whitesmoke; display: flex; justify-content: center;">${statusRest}</p>
      <p class="card-text city  style="color: whitesmoke; display: flex; justify-content: center;">${aboutRest}</p>
      <p class="card-text rate  style="color: whitesmoke; display: flex; justify-content: center;">${fullNameRest}</p>
      <p class="card-text rate  style="color: whitesmoke; display: flex; justify-content: center;">${addressRest}</p>
      <p class="card-text rate  style="color: whitesmoke; display: flex; justify-content: center;">${phoneRest}</p>
      <p class="card-text rate  style="color: whitesmoke; display: flex; justify-content: center;">${websiteRest}</p>
      <a href="${websiteRest}" class="btn btn-primary bookRest style="margin: 0 auto; display: flex; justify-content: center;">Book Now</a>`
    );

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
    <img class="child-img" src="${pictureUrlRest}" alt="image" />`
        );
      }
    });
  });
}
