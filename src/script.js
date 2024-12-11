// alert("hi");

const input = document.querySelector(".input-city");
const addBtn = document.querySelector(".search-btn");
const currentLocaion = document.querySelector(".current-location");

//
let cityData = {};

//
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log(input.value);
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
      return;
    }
    const data = await response.json();
    cityData = data;
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

function renderData(data) {}
