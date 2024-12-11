// alert("hi");

const input = document.querySelector(".input-city");
const addBtn = document.querySelector(".search-btn");
const currentLocaion = document.querySelector(".current-location");

//
let cityData;

const weatherIcons = {
  Sunny: "https://cdn-icons-gif.flaticon.com/11200/11200542.gif",

  Clear: "https://cdn-icons-gif.flaticon.com/11708/11708865.gif",
  "Partly cloudy": "https://cdn-icons-gif.flaticon.com/16939/16939742.gif",
  Cloudy: "https://cdn-icons-gif.flaticon.com/16939/16939742.gif",
  Overcast: "https://cdn-icons-gif.flaticon.com/17102/17102874.gif",
  Mist: "https://cdn-icons-gif.flaticon.com/6454/6454995.gif",

  "Patchy rain possible":
    "https://cdn-icons-gif.flaticon.com/14822/14822191.gif",
  "Patchy snow possible":
    "https://cdn-icons-gif.flaticon.com/17103/17103085.gif",
  "Patchy sleet possible":
    "https://cdn-icons-gif.flaticon.com/17103/17103103.gif",
  "Patchy freezing drizzle possible":
    "https://cdn-icons-gif.flaticon.com/17102/17102975.gif",
  "Thundery outbreaks possible":
    "https://cdn-icons-gif.flaticon.com/17904/17904752.gif",
  "Blowing snow": "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  Blizzard: "https://cdn-icons-gif.flaticon.com/17103/17103103.gif",
  Fog: "https://cdn-icons-gif.flaticon.com/17102/17102868.gif",
  "Freezing fog": "https://cdn-icons-gif.flaticon.com/17102/17102868.gif",
  "Patchy light drizzle":
    "https://cdn-icons-gif.flaticon.com/17102/17102975.gif",
  "Light drizzle": "https://cdn-icons-gif.flaticon.com/17102/17102975.gif",
  "Freezing drizzle": "https://cdn-icons-gif.flaticon.com/17102/17102975.gif",
  "Heavy freezing drizzle":
    "https://cdn-icons-gif.flaticon.com/17102/17102975.gif",
  "Patchy light rain": "https://cdn-icons-gif.flaticon.com/14822/14822191.gif",
  "Light rain": "https://cdn-icons-gif.flaticon.com/14822/14822191.gif",
  "Moderate rain at times":
    "https://cdn-icons-gif.flaticon.com/14822/14822191.gif",
  "Moderate rain": "https://cdn-icons-gif.flaticon.com/14822/14822191.gif",
  "Heavy rain at times":
    "https://cdn-icons-gif.flaticon.com/17102/17102963.gif",
  "Heavy rain": "https://cdn-icons-gif.flaticon.com/17102/17102963.gif",
  "Light freezing rain":
    "https://cdn-icons-gif.flaticon.com/17102/17102963.gif",
  "Moderate or heavy freezing rain":
    "https://cdn-icons-gif.flaticon.com/17102/17102963.gif",
  "Light sleet": "https://cdn-icons-gif.flaticon.com/17103/17103103.gif",
  "Moderate or heavy sleet":
    "https://cdn-icons-gif.flaticon.com/17103/17103103.gif",
  "Patchy light snow": "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Light snow": "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Patchy moderate snow":
    "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Moderate snow": "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Patchy heavy snow": "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Heavy snow": "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Ice pellets": "https://cdn-icons-gif.flaticon.com/17102/17102834.gif",
  "Light rain shower": "https://cdn-icons-gif.flaticon.com/17905/17905602.gif",
  "Moderate or heavy rain shower":
    "https://cdn-icons-gif.flaticon.com/17102/17102963.gif",
  "Torrential rain shower":
    "https://cdn-icons-gif.flaticon.com/17102/17102917.gif",
  "Light sleet showers": "https://cdn-icons-gif.flaticon.com/6455/6455056.gif",
  "Moderate or heavy sleet showers":
    "https://cdn-icons-gif.flaticon.com/6455/6455056.gif",
  "Light snow showers": "https://cdn-icons-gif.flaticon.com/17103/17103041.gif",
  "Moderate or heavy snow showers":
    "https://cdn-icons-gif.flaticon.com/17484/17484878.gif",
  "Light showers of ice pellets":
    "https://cdn-icons-gif.flaticon.com/17102/17102834.gif",
  "Moderate or heavy showers of ice pellets":
    "https://cdn-icons-gif.flaticon.com/17102/17102834.gif",
  "Patchy light snow with thunder":
    "https://cdn-icons-png.flaticon.com/128/7587/7587490.png",
  "Moderate or heavy snow with thunder":
    "https://cdn-icons-png.flaticon.com/128/7587/7587490.png",
};

//
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let city = input.value;
  if (city != "") {
    fetchData(city);
  }
  input.value = "";
});
//
currentLocaion.addEventListener("click", currrentLocation);
//
async function fetchData(p) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=9b3c7cb761f84f48aa0145626240712&q=${p}&days=5`
    );
    if (!response.ok) {
      alert(
        "Failed to fetch data. Please check the city name or try again later."
      );
    }
    const data = await response.json();
    // console.log(data);
    cityData = data;
    renderData(cityData);
  } catch (err) {
    alert(
      "Unable to fetch data. Please check your internet connection and try again."
    );
    console.log(err);
  }
}

///
function currrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (data) => {
      let cordinates = `${data.coords.latitude},${data.coords.longitude}`;
      //   console.log(cordinates);
      fetchData(cordinates);
    },
    (err) => {
      console.log(err.message);
    }
  );
}

function renderData(data) {
  console.log(data);
  const cityName = document.querySelector(".city-name");
  const time = document.querySelector(".time");
  const date = document.querySelector(".date");
  const temp = document.querySelector(".temp");
  const feelsLike = document.querySelector(".feels-like");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const pressure = document.querySelector(".pressure");
  const uv = document.querySelector(".uv");
  const sunrise = document.querySelector(".sunrise");
  const sunset = document.querySelector(".sunset");
  const condition = document.querySelector(".condition");
  const conditionIcon = document.querySelector(".condition-icon");

  //
  cityName.innerText = data.location["name"];
  time.innerText = data.location.localtime.toString().slice(11);
  date.innerText = data.location.localtime.toString().slice(0, 10);
  temp.innerText = data.current.temp_c;
  feelsLike.innerText = data.current.feelslike_c;
  humidity.innerText = data.current.humidity;
  wind.innerText = data.current.wind_kph;
  pressure.innerText = data.current.pressure_mb;
  uv.innerText = data.current.uv;
  sunrise.innerText = data.forecast.forecastday[0].astro.sunrise;
  sunset.innerText = data.forecast.forecastday[0].astro.sunset;
  condition.innerText = data.current.condition.text;
  conditionIcon.setAttribute(
    "src",
    `${weatherIcons[`${data.current.condition.text}`]}`
  );
}

currrentLocation();
