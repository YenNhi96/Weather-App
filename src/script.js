let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function weatherConditions(response) {
  document.querySelector(".currentDegree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".currentCity").innerHTML = response.data.name;
}

function search(city) {
  city.preventDefault();
  let searchInput = document.querySelector(".form-control");
  document.querySelector(".currentCity").innerHTML = `${searchInput.value}`;
  let apiKey = "cffcba26a6e9ace9bd18290032464552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherConditions);
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", search);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cffcba26a6e9ace9bd18290032464552";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(weatherConditions);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button2 = document.querySelector(".current-location-button");
button2.addEventListener("click", getCurrentPosition);
