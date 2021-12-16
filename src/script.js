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

function displayForecast() {
  let forecastElement = document.querySelector(".weather-forecast");

  let days = ["Fri", "Sat", "Sun"];
  let multipleForecast = `<div class="row">`;

  days.forEach(function (nextDays) {
    multipleForecast =
      multipleForecast +
      `
      <div class="col-2">
        <div id="next-day">${nextDays}</div>
          <img
                class="forecast-icon"
                src="http://openweathermap.org/img/wn/04n@2x.png"
                alt="#"
                width="80"
              />
        <div class="temperature-forecast">
          <span id="max-temp">18°</span>
          <span id="min-temp">12°</span>
        </div>
      </div>
    `;
  });

  multipleForecast = multipleForecast + `</div>`;

  forecastElement.innerHTML = multipleForecast;
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
  displayForecast();
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
