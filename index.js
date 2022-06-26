let now = new Date();
let h1 = document.querySelector("#currentDate");
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
let year = now.getFullYear();
h1.innerHTML = `${month} ${date}, ${year}`;

function showTemperatureCurrent(response) {
  console.log(response);

  temperatureCelsius = response.data.main.temp;

  let h3 = document.querySelector("#temperature");
  h3.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#city-Name").innerHTML = response.data.name;
  document.querySelector("#country-Name").innerHTML = response.data.sys.country;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function cityShow(city) {
  let apiKey = "d61b6cb1e9c414063f1d5c545d36fd21";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemperatureCurrent);
}

function submitForm(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-Input");
  cityShow(cityInputElement.value);
}

let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", submitForm);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d61b6cb1e9c414063f1d5c545d36fd21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperatureCurrent);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentCity);

function temperatureFahrenheitShow(event) {
  event.preventDefault();
  let h3 = document.querySelector("#temperature");
  let temperatureFahrenheit = Math.round((temperatureCelsius * 9) / 5 + 32);
  h3.innerHTML = temperatureFahrenheit;
}

function temperatureCelsiusFunction(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(temperatureCelsius);
}

let temperatureCelsius = null;

let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
temperatureFahrenheit.addEventListener("click", temperatureFahrenheitShow);

let temperatureCelsiusShow = document.querySelector("#celsius-link");
temperatureCelsiusShow.addEventListener("click", temperatureCelsiusFunction);

cityShow("Costa Rica");
