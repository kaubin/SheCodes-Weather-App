function formatDate(timestamp){
let date = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day}, ${formatHours(timestamp)}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-celcius").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-farenheight").innerHTML = Math.round(((response.data.main.temp) * 9) / 5 + 32);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function formatHours (timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
     <div class="row">
        <div class="col-3">${formatHours(forecast.dt * 1000)} 
        </div>
        <div class="col-3">
          <img
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          />
        </div>
        <div class="col-3">high: ${Math.round(forecast.main.temp_max)}°C</div>
        <div class="col-3">low: ${Math.round(forecast.main.temp_min)}°C</div>
      </div>`;
  }
}

function search(event) {
  event.preventDefault();
  let apiKey = "f6881838fc1c53a329348e6e031d8cc0";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);