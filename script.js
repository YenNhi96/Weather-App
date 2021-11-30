let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
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

function search(city) {
  city.preventDefault();
  let searchInput = document.querySelector(".form-control");
  let h1 = document.querySelector(".currentCity");
  h1.innerHTML = `${searchInput.value}`;
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", search);

function displayCelsius() {
  let degree1 = document.querySelector(".currentDegree");
  degree1.innerHTML = Math.floor(((degree1.innerHTML - 32) * 5) / 9);
}

function displayFahrenheit() {
  let degree2 = document.querySelector(".currentDegree");
  degree2.innerHTML = Math.floor((degree2.innerHTML * 9) / 5 + 32);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);
