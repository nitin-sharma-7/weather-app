// alert("hi");

// Select DOM elements
const input = document.querySelector(".input-city"); // Input field for city name
const addBtn = document.querySelector(".search-btn"); // Button to add city
const currentLocaion = document.querySelector(".current-location"); // Button for current location
const hourForecast = document.querySelector(".hourly-forecast"); // Container for hourly forecast
const daysForecast = document.querySelector(".five-days-forecast"); // Container for 5 days forecast
const recentBox = document.querySelector(".recent-box"); // Box for recent cities
const recCities = document.querySelector(".recent-cities"); // Dropdown for recent cities
const toggler = document.querySelector(".toggler"); // Toggler for UI (not used in this code)

//Variable to hold city data
let cityData;
// Object to map weather conditions to corresponding icons
const weatherIcons = {
  "Patchy rain nearby": "https://cdn-icons-gif.flaticon.com/14822/14822237.gif",

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

// // Retrieve recent cities from local storage or initialize as an empty array

let recentCities = JSON.parse(localStorage.getItem("recent")) || [];
//// Event listener for the add button
addBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission
  let city = input.value; // Get the city name from input
  if (city != "") {
    fetchData(city); // Fetch weather data for the city
  }
  input.value = ""; // Clear the input field
});
// Event listener for the current location button
currentLocaion.addEventListener("click", currrentLocation);

// Function to fetch weather data from the API
async function fetchData(p) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9b3c7cb761f84f48aa0145626240712&q=${p}&days=5`
    );
    if (response.status == 400) {
      alert("please check city name"); // Alert if city name is invalid
      return;
    }
    // console.log(response.status);
    const data = await response.json(); // Parse the JSON response
    // console.log(data);
    cityData = data; // Store the data in cityData variable
    renderData(cityData); // Render the data on the UI
    addRecent(data.location["name"]); // Add city to recent cities
  } catch (err) {
    alert("please check your internet connection ."); // Alert if there's a network error
  }
}

///// Function to get the user's current location
function currrentLocation() {
  let timerCondition = false; // Flag to check if the timer has expired
  const timer = setTimeout(() => {
    timerCondition = true; // Set flag to true after 5 seconds
    alert("Hi, it took too long to find your location."); // Alert if location takes too long
  }, 5000);
  // Get current position using Geolocation API
  navigator.geolocation.getCurrentPosition(
    (data) => {
      if (timerCondition) {
        return; // If timer expired, do nothing
      }
      clearTimeout(timer); //clear the timer
      // Get coordinates
      let cordinates = `${data.coords.latitude},${data.coords.longitude}`;
      fetchData(cordinates); // Fetch weather data using coordinates
    },
    (err) => {
      clearTimeout(timer); // Clear the timer on error
      console.log(err.message); // Log the error message
    }
  );
}
// Function to render weather data on the UI
function renderData(data) {
  // Select elements to display weather data
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

  /// Update the UI with the fetched weather data
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
  //  // Render hourly forecast

  let arrHours = data.forecast.forecastday[0].hour; // array of hours data
  //   console.log(arrHours);
  hourForecast.innerHTML = ""; // Clear previous hourly forecast

  for (let i = 0; i <= 23; i += 5) {
    // Loop through every 5 hours
    // console.log(arrHours[i]);
    const hourDIv = document.createElement("div");
    hourDIv.classList.add("w-[100%]");
    const hourHtml = ` <div class="flex justify-between items-center w-[100%] py-1">
                    <p>${arrHours[i].time.toString().slice(11)}</p>
                    <img class="w-8" src='${
                      weatherIcons[`${arrHours[i].condition.text.trim()}`]
                    }' alt="${arrHours[i].condition.text.trim()}">
                    <P class="font-bold">${arrHours[
                      i
                    ].condition.text.trim()}</P>
                    <p>${arrHours[i].temp_c} °C</p>
                  </div>`;

    hourDIv.innerHTML = hourHtml; // Set inner HTML for hourly data
    hourForecast.append(hourDIv); // Append to hourly forecast container
  }
  // Render 5 days forecast
  daysForecast.innerHTML = ""; // Clear previous 5 days forecast
  const forecastDays = data.forecast.forecastday; // Get forecast days
  forecastDays.map((day) => {
    const forecastDiv = document.createElement("div");
    forecastHtml = `<div class="flex flex-col justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2 py-5 rounded-xl text-[14px]">
                  <p>${day.date}</p>
                  <img class="w-10" src="${
                    weatherIcons[`${day.day.condition.text.trim()}`]
                  }" alt="">
                  <p><span>Temp :</span>&nbsp;<span>${
                    day.day.maxtemp_c
                  } °C</span></p>
                  <p><span>Wind :</span>&nbsp;<span>${
                    day.day.maxwind_kph
                  } km/h</span></p>
                  <p><span>Humidity :</span>&nbsp;<span>${
                    day.day.avghumidity
                  } %</span></p>
                </div>`;
    forecastDiv.innerHTML = forecastHtml; // Set inner HTML for forecast data
    daysForecast.append(forecastDiv); // Append to 5 days forecast container
  });
}

//// Function to add recent cities to local storage
function addRecent(city) {
  if (!recentCities.includes(city)) {
    // Check if city is not already in recent cities
    recentCities.push(city); // Add city to recent cities
  }

  localStorage.clear(); // Clear local storage
  localStorage.recent = JSON.stringify(recentCities); // Save recent cities to local storage
  showRecent(JSON.parse(localStorage.getItem("recent"))); // Show updated recent cities
}
// Event listener for recent cities box
recentBox.addEventListener("click", () => {
  if (recentCities.length >= 5) {
    recCities.classList.add("overflow-y-scroll"); // Add scroll if more than 5 cities
    // console.log(recentCities.length);
  }
  if (recentCities.length != 0) {
    recCities.classList.toggle("hidden"); // Toggle visibility of recent cities
  }
});
// Event listener for clicks outside the recent cities dropdown
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("fa-list") &&
    !e.target.classList.contains("recent-box") &&
    !e.target.classList.contains("parent-recent") &&
    !e.target.classList.contains("recent-cities") &&
    !e.target.classList.contains("delete") &&
    !e.target.classList.contains("recent-span") &&
    !e.target.classList.contains("show")
  ) {
    recCities.classList.add("hidden"); // Hide recent cities dropdown if clicked outside
    // console.log(e.target);
  }
});
// Function to display recent cities
function showRecent(recents) {
  recCities.innerHTML = ""; // Clear previous recent cities
  recents.map((recent, i) => {
    let div = document.createElement("div"); // Create a new div for each recent city
    div.classList.add("flex");
    div.classList.add("justify-between");
    div.classList.add("w-[90%]");
    div.classList.add("px-2");
    div.classList.add("cursor-pointer");
    div.classList.add(
      "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
    );

    div.innerHTML = ` <p class='show hover:text-black transition-all   hover:scale-110 active:scale-50 ease-in duration-500' >${recent}</p>
            <button   ><i class="fa-solid fa-trash-can-arrow-up delete transition-all active:scale-50 ease-in duration-500   hover:scale-125" data-index=${i}></i></button>`;
    recCities.append(div); // Append the new div to the recent cities container
  });
}

//// Event listener for clicks on recent cities
recCities.addEventListener("click", (e) => {
  //   console.log(e.target.dataset.indexNumber);
  if (e.target.classList.contains("delete")) {
    deleteRecent(e.target); // Call delete function if delete icon is clicked
  }
  if (e.target.classList.contains("show")) {
    // input.value = e.target.innerText;
    fetchData(e.target.innerText); // Fetch weather data for the clicked recent city
  }
});
// Function to delete a recent city
function deleteRecent(val) {
  recentCities.splice(val.dataset.index, 1); // Remove city from recent cities array
  // console.log(recentCities);
  localStorage.clear(); // clear localstorage
  localStorage.recent = JSON.stringify(recentCities); // Update local storage with new recent cities
  showRecent(JSON.parse(localStorage.getItem("recent"))); // Show updated recent cities
}
// Display recent cities on page load
showRecent(JSON.parse(localStorage.getItem("recent")));

// Uncomment to enable current location functionality
// currrentLocation();
