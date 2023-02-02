////VARIABLES////


////RESTAURANT API////

//Restaurant search

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://worldwide-restaurants.p.rapidapi.com/search",
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "68ca58338cmsh0e5547f05cd1b4bp1fa33djsn973d3db4137f",
        "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com"
    },
    "data": {
        "language": "en_US",
        "limit": "30",
        "location_id": "297704",
        "currency": "USD"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});

//Restaurant details