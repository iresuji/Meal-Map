
console.log("test");

 

$("#searchBtn").on("click", function(event) { 
         event.preventDefault();
console.log("Hello");

let city = $('#citySearch').val()

console.log(city);


// First query to get locationID
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query="+ city,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "68792a8c29msh7c9d9f267e046f3p104235jsne344dbf0c883",
		"X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);




  let searchId = response.data[0].locationId;
console.log(searchId);
// Second query to get restaurantID
const settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=" + searchId,
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "68792a8c29msh7c9d9f267e046f3p104235jsne344dbf0c883",
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com"
    }


    };
    $.ajax(settings2).done(function (response) {
        console.log(response);
 for (i=0; response.data.data.length >i; i++ ){
var listOfRest = response.data.data[i];
var typeFood = listOfRest.establishmentTypeAndCuisineTags[0];
var nameRest = listOfRest.name;
var cityRest = listOfRest.parentGeoName;
var imageRest = listOfRest.heroImgUrl;
var rateRest = listOfRest.averageRating;
var restaurantId = listOfRest.restaurantsId;

$()
<!-- <div class="child">
<img class="child-img" src="./emma.jpg" alt="image" />
</div>


 }




        ;

    });
});
})


//    // Third query to get details
//    const settings3 = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/getRestaurantDetails?restaurantsId=" + restaurantId,
//     "method": "GET",
//     "headers": {
//         "X-RapidAPI-Key": "68792a8c29msh7c9d9f267e046f3p104235jsne344dbf0c883",
//         "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com"
//     }
// };

// $.ajax(settings3).done(function (response) {
//     console.log(response);
// });


