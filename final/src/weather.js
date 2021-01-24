const API_KEY = "73b5a06ebba22f08d87604ea907a371d";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat,lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerHTML = `${temperature} ℃ @ ${place}`
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError() {
  console.log("Can't access geo location")
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude,parseCoords.longitude);

  }
}
function init() {
  loadCoords();
}

init()