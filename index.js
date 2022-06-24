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

function showTemperature(response) {
  let h3 = document.querySelector("#temperature");
  let temperatureCelsius = Math.round(response.data.main.temp);
  h3.innerHTML = temperatureCelsius;
}

function cityShow(event) {
  event.preventDefault();
  let heading = document.querySelector("#city-Input");
  let cityName = document.querySelector("#city-Name");
  cityName.innerHTML = heading.value;
  let city = heading.value;
  let apiKey = "d61b6cb1e9c414063f1d5c545d36fd21";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemperature);
}

let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", cityShow);

function showTemperatureCurrent(response) {
  let h3 = document.querySelector("#temperature");
  console.log(response);
  h3.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city-Name").innerHTML = response.data.name;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  let apiKey = "d61b6cb1e9c414063f1d5c545d36fd21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperatureCurrent);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentCity);
