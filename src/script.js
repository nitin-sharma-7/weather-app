// alert("hi");

const input = document.querySelector(".input-city");
const addBtn = document.querySelector(".search-btn");
const currentLocaion = document.querySelector(".current-location");

//
let cityData;

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
async function fetchData(p) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=9b3c7cb761f84f48aa0145626240712&q=${p}&days=5`
    );
    const data = await response.json();
    // console.log(data);
    cityData = data;
    console.log(cityData);
  } catch (err) {
    console.log(err.json());
  }
}

///
