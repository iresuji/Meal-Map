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

let sliderImages = document.querySelectorAll('.slider img'),
    arrowLeft = document.querySelector('#arrow-left'),
    arrowRight = document.querySelector('#arrow-right'),
    current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = 'block';
}

// Show previous
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  current++;
}

// Left arrow click
arrowLeft.addEventListener('click', function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener('click', function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

setInterval(function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
}, 3000);


var sliderIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slider");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  sliderIndex++;
  if (sliderIndex > slides.length) {sliderIndex = 1}  
  slides[sliderIndex-1].style.display = "block";  
  setTimeout(showSlides, 3000); 
}

function plusSlides(n) {
  sliderIndex += n;
  showSlides();
}