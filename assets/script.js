console.log("script connected");

// NOTES =======================================================
// would like to put ajax request in main event listener, save two calls to two vars, send to functions.
// TODO: uv index only in onecall api
// TODO: need to get icon working
// TODO: event listener for past search breaks website

// ACTIVE ELEMENT CONNECTIONS ==================================

// Search
var searchText = document.getElementById("search-text");
var searchButton = document.getElementById("search-button");
// var pastSearch = document.getElementsByClassName("past-search");

// Main Forecast
var mainCity = document.getElementById("main-city");
var mainDate = document.getElementById("main-date");
// var mainIcon = document.getElementById("main-icon");
var mainTemp = document.getElementById("main-temp");
var mainHumi = document.getElementById("main-humi");
var mainWind = document.getElementById("main-wind");
// var mainUVin = document.getElementById("main-UVin");

// Five Day Forecast

var date = [
	document.getElementById("date1"),
	document.getElementById("date2"),
	document.getElementById("date3"),
	document.getElementById("date4"),
	document.getElementById("date5"),
];
var temp = [
	document.getElementById("temp1"),
	document.getElementById("temp2"),
	document.getElementById("temp3"),
	document.getElementById("temp4"),
	document.getElementById("temp5"),
];
var humi = [
	document.getElementById("humi1"),
	document.getElementById("humi2"),
	document.getElementById("humi3"),
	document.getElementById("humi4"),
	document.getElementById("humi5"),
];
var wind = [
	document.getElementById("wind1"),
	document.getElementById("wind2"),
	document.getElementById("wind3"),
	document.getElementById("wind4"),
	document.getElementById("wind5"),
];

// Local Storage Count
var searchID = localStorage.length + 1;

// FUNCTIONS ===================================================

function saveCity(cityToSave) {
	localStorage.setItem(`city${searchID}`, cityToSave);
	searchID++;
	const para = document.createElement("button");
	const node = document.createTextNode(cityToSave);
	para.appendChild(node);
    para.setAttribute("class", "past-search btn btn-secondary");
    para.setAttribute("type", "button")
	const element = document.getElementById("past-searches");
	element.appendChild(para);
}

function getCities() {
	var stored = Object.keys(localStorage);
	// console.log(stored);
	for (let i = 0; i < stored.length; i++) {
		var value = localStorage.getItem(stored[i]);
		const para = document.createElement("button");
		const node = document.createTextNode(value);
		para.appendChild(node);
		para.setAttribute("class", "past-search btn btn-secondary");
        para.setAttribute("type", "button")
		const element = document.getElementById("past-searches");
		element.appendChild(para);
	}
}

function mainWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=11c4c7d120bdbf4576aa8f9f0b1b315d`,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		mainCity.textContent = response.name;
		mainDate.textContent = moment().format("L")
		// console.log(response.weather[0].icon);
		// mainIcon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
		mainTemp.textContent = response.main.temp;
		mainHumi.textContent = response.main.humidity;
		mainWind.textContent = response.wind.speed;
		// mainUVin.textContent =
	});
}

function forecastWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=11c4c7d120bdbf4576aa8f9f0b1b315d`,
		method: "GET",
	}).then(function (response) {
		// console.log(response);
		for (let i = 0; i < 5; i++) {
			date[i].textContent = moment
				.unix(response.list[i * 8].dt)
				.format("L");
			temp[i].textContent = response.list[i * 8].main.temp;
			humi[i].textContent = response.list[i * 8].main.humidity;
			wind[i].textContent = response.list[i * 8].wind.speed;
			// ^ that's sick, good job you lol
		}
	});
}

getCities();

// EVENT LISTENERS =============================================

searchButton.addEventListener("click", function (event) {
	event.preventDefault();
	let currentCity = searchText.value;
	saveCity(currentCity);
	mainWeather(currentCity);
	forecastWeather(currentCity);
});
