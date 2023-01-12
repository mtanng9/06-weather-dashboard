document.getElementById("search-btn").addEventListener("click", function() {
    // Grab city input on search button click
    var city = document.getElementById("search-city").value;

    // get weather info
    currentWeather(city);

    // save to local storage
    localStorage.setItem(city, city);

    // display in history list
    // TODO: figure out how to retrive mutiple cities
});


// grab city on history item click
// get weather info


function currentWeather(city) {
    // show current weather of "current" city
    // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
    var latLongUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=f54958beffeb4349ae2a5307de77a8a2";
    fetch(latLongUrl)
        .then(function(response){return response.json()})
        .then(function(response){console.log(response)})
}

function fiveDayWeather(city) {
    // show 5 day weather of "current" city
    // date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
}
