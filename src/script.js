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

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let multipleForecast = `<div class="row">`;

  forecast.forEach(function (nextDays, index) {
    if (index < 7 && index > 0) {
      multipleForecast =
        multipleForecast +
        `
      <div class="col-2">
        <div id="next-day">${formatDays(nextDays.dt)}</div>
          <img
                class="forecast-icon"
                src="http://openweathermap.org/img/wn/${
                  nextDays.weather[0].icon
                }@2x.png"
                alt="#"
                width="80"
              />
        <div class="temperature-forecast">
          <span id="max-temp">${Math.round(nextDays.temp.max)}°</span>
          <span id="min-temp">${Math.round(nextDays.temp.min)}°</span>
        </div>
      </div>
    `;
    }
  });

  multipleForecast = multipleForecast + `</div>`;

  forecastElement.innerHTML = multipleForecast;
}

function getForecast(coordinates) {
  let apiKey = "cffcba26a6e9ace9bd18290032464552";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function weatherConditions(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".currentDegree").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".currentCity").innerHTML = response.data.name;

  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function defaultCity(city1) {
  let apiKey = "cffcba26a6e9ace9bd18290032464552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherConditions);
}

function search(city) {
  city.preventDefault();
  let searchInput = document.querySelector(".form-control");
  document.querySelector(".currentCity").innerHTML = `${searchInput.value}`;
  defaultCity(searchInput.value);
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", search);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
  let fahrenheitElement = document.querySelector(".currentDegree");
  fahrenheitElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
  let celsiusElement = document.querySelector(".currentDegree");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitConversion = document.querySelector("#fahrenheit");
fahrenheitConversion.addEventListener("click", displayFahrenheitTemperature);

let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

defaultCity("Hanoi");
