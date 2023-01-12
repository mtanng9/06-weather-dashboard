document.getElementById("search-btn").addEventListener("click", function() {
    // Grab city input on search button click
    var city = document.getElementById("search-city").value;

    // get weather info
    currentWeather(city);
    fiveDayWeather(city);

    // save to local storage
    localStorage.setItem(city, city);

    // display in history list
    // TODO: figure out how to retrive mutiple cities
});


// grab city on history item click
// get weather info


async function currentWeather(city) {
    // show current weather of "current" city
    var latLongUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=f54958beffeb4349ae2a5307de77a8a2";
    var latLongUrlResponse = await fetch(latLongUrl);
    var latLongUrlJson = await latLongUrlResponse.json();

    var lat = latLongUrlJson[0].lat;
    var lon = latLongUrlJson[0].lon;

    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=f54958beffeb4349ae2a5307de77a8a2";
    var currentWeatherUrlResponse = await fetch(currentWeatherUrl);
    var currentWeatherUrlJson = await currentWeatherUrlResponse.json();

    // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
    var cityName = currentWeatherUrlJson.name;
    var date = dayjs().format('YYYY-MM-DD');
    var icon;
    var temp = currentWeatherUrlJson.main.temp;
    var humidity = currentWeatherUrlJson.main.humidity;
    var windspeed = currentWeatherUrlJson.wind.speed;

    document.getElementById("current-city").innerHTML = cityName + " (" + date + ")";
    document.getElementById("current-temp").innerHTML = "Temp: " + temp + "F";
    document.getElementById("current-wind").innerHTML = "Wind: " + windspeed + " MPH";
    document.getElementById("current-humidity").innerHTML = "Humidity: " + humidity + "%";
}

async function fiveDayWeather(city) {
    // show 5 day weather of "current" city
    var latLongUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=f54958beffeb4349ae2a5307de77a8a2";
    var latLongUrlResponse = await fetch(latLongUrl);
    var latLongUrlJson = await latLongUrlResponse.json();

    var lat = latLongUrlJson[0].lat;
    var lon = latLongUrlJson[0].lon;

    var fiveDayWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=f54958beffeb4349ae2a5307de77a8a2";
    var fiveDayWeatherUrlResponse = await fetch(fiveDayWeatherUrl);
    var fiveDayWeatherUrlResponseJson = await fiveDayWeatherUrlResponse.json();

    weatherSlots = fiveDayWeatherUrlResponseJson.list;
    nextFiveDaysUnix = [
        dayjs().add(1,'day').hour(12).minute(00).second(00).format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(2,'day').hour(12).minute(00).second(00).format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(3,'day').hour(12).minute(00).second(00).format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(4,'day').hour(12).minute(00).second(00).format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(5,'day').hour(12).minute(00).second(00).format('YYYY-MM-DD HH:mm:ss')
    ];


    fiveDayWeatherSlots = [];
    for (day of nextFiveDaysUnix) {
        for (weatherSlot of weatherSlots) {
            if (weatherSlot.dt_txt === day) {
                fiveDayWeatherSlots.push(weatherSlot);
            }
        }
    }

    // date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    for (slot of fiveDayWeatherSlots) {
        var parent = document.getElementById("five-day-forecast");

        var container = document.createElement("div")
        container.classList.add("col");

        
        var day = document.createElement("h2");
        day.innerHTML = slot.dt_txt.slice(0,10);
        container.appendChild(day);

        var temp = document.createElement("p");
        temp.innerHTML = "Temp: " + slot.main.temp + "F";
        container.appendChild(temp);


        var wind = document.createElement("p");
        wind.innerHTML = "Wind: " + slot.wind.speed + " MPH";
        container.appendChild(wind);


        var humidty = document.createElement("p");
        humidty.innerHTML = "Humidity: " + slot.main.humidity + "%"; 
        container.appendChild(humidty);

        parent.append(container);

    }

}
