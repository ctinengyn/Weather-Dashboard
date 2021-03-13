// Variables 
var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");

var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");

// Store API key
// After user searches up city, it will display current weather
var apiKey = "c0b5527e46e133285bbf1cfe6786f6bf";

function displayWeather(event){
    event.preventDefault();

    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

