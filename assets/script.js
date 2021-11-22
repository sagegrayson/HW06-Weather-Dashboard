console.log("script connected");

// ACTIVE ELEMENT CONNECTIONS ==================================

// Search
var searchText = document.getElementById("search-text");
var searchButton = document.getElementById("search-button");
var pastSearch = document.getElementById("past-search");

// Main Forecast
var mainCity = document.getElementById("main-city");
var mainDate = document.getElementById("main-date");
var mainIcon = document.getElementById("main-icon");
var mainTemp = document.getElementById("main-temp");
var mainHumi = document.getElementById("main-humi");
var mainWind = document.getElementById("main-wind");
var mainUVin = document.getElementById("main-UVin");

// Five Day Forecast
var date1 = document.getElementById("date1");
var icon1 = document.getElementById("icon1");
var temp1 = document.getElementById("temp1");
var humi1 = document.getElementById("humi1");
var wind1 = document.getElementById("wind1");

var date2 = document.getElementById("date2");
var icon2 = document.getElementById("icon2");
var temp2 = document.getElementById("temp2");
var humi2 = document.getElementById("humi2");
var wind2 = document.getElementById("wind2");

var date3 = document.getElementById("date3");
var icon3 = document.getElementById("icon3");
var temp3 = document.getElementById("temp3");
var humi3 = document.getElementById("humi3");
var wind3 = document.getElementById("wind3");

var date4 = document.getElementById("date4");
var icon4 = document.getElementById("icon4");
var temp4 = document.getElementById("temp4");
var humi4 = document.getElementById("humi4");
var wind4 = document.getElementById("wind4");

var date5 = document.getElementById("date5");
var icon5 = document.getElementById("icon5");
var temp5 = document.getElementById("temp5");
var humi5 = document.getElementById("humi5");
var wind5 = document.getElementById("wind5");

// Local Storage Count
var searchID = localStorage.length + 1;

// EVENT LISTENERS =============================================

searchButton.addEventListener("click", function (event) {
	event.preventDefault();
	var currentCity = searchText.value;
	saveCity(currentCity);
	mainWeather(currentCity);
	forecastWeather(currentCity);
});

// FUNCTIONS ===================================================

function saveCity(cityToSave) {
	localStorage.setItem(`city${searchID}`, cityToSave);
	searchID++;
	// TODO: redraw past search buttons
	console.log(localStorage);
}

function mainWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=11c4c7d120bdbf4576aa8f9f0b1b315d`,
	});
}
