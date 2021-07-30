const apiKey = "c0b5527e46e133285bbf1cfe6786f6bf";

const locationInput = JSON.parse(localStorage.getItem("locationInput")) || [];

const date = moment().format("M/DD/YYYY");

const containerEl = document.querySelector(".container");
const currentDayEl = document.getElementById("currentDay");
const dayDataEl = document.getElementById("dayData");
const userInputEl = document.getElementById("location");
const forcastEl = document.getElementById("forecast");
const searchBtnEl = document.getElementById("submitBtn");
const historyEl = document.getElementById("history");

function cityApi(city) {
  let cityUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      currentDayEl.innerHTML = "";
      dayDataEl.innerHTML = "";
      currentDayEl.appendChild(dayDataEl);

      const cityName = document.createElement("h2");
      cityName.textContent = data.name + " (" + date + ") ";
      dayDataEl.appendChild(cityName);

      const iconData = document.createElement("img");
      iconData.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      iconData.classList.add("icon");
      dayDataEl.appendChild(iconData);

      const windData = document.createElement("span");
      windData.textContent = "Wind Speed: " + data.wind.speed + "MPH";
      currentDayEl.appendChild(windData);

      const tempData = document.createElement("span");
      tempData.textContent = "Temperature: " + data.main.temp + "°F";
      currentDayEl.appendChild(tempData);

      const humidityData = document.createElement("span");
      humidityData.textContent = "Humidity: " + data.main.humidity + "%";
      currentDayEl.appendChild(humidityData);
    });
}

function locationHistory() {
  console.log(locationInput);
  historyEl.innerHTML = "";
  for (var i = locationInput.length - 1; i >= 0; i--) {
    console.log(locationInput[i]);
    const loc = locationInput[i];
    const listItem = document.createElement("li");
    const listBtn = document.createElement("button");
    listBtn.textContent = loc;
    listBtn.classList.add("btn");
    listBtn.addEventListener("click", function getApis() {
      currentDayApi(loc);
      fiveApi(loc);
    });
    listItem.appendChild(listBtn);
    historyEl.appendChild(listItem);
  }
}

function getLocation() {
  const location = userInputEl.value.trim();
  locationInput.push(location);
  localStorage.setItem("locationInput", JSON.stringify(locationInput));
  cityApi(location);
  fiveApi(location);
  locationHistory();
}

searchBtnEl.addEventListener("click", getLocation);

function fiveApi(city) {
  let fiveUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  fetch(fiveUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const newDays = data.list.filter(function (element, i) {
        if (element.dt_txt.indexOf("18:00:00") !== -1) {
          return element;
        }
      });
      containerEl.innerHTML = "";
      newDays.newData(function (element, i) {
        const card = document.createElement("div");
        card.classList.add("card");
        const h3 = document.createElement("h3");
        h3.textContent = moment(element.dt_txt).format("M/DD/YY");
        const weekdayIcon = document.createElement("img");
        weekdayIcon.setAttribute(
          "src",
          "https://openweathermap.org/img/w/" + element.weather[0].icon + ".png"
        );
        weekdayIcon.classList.add("icon");
        const temp = document.createElement("p");
        temp.textContent = "Temp: " + element.main.temp_max + "°F";
        const hum = document.createElement("p");
        hum.textContent = "Humidity: " + element.main.humidity + "%";
        card.appendChild(h3);
        card.appendChild(weekdayIcon);
        card.appendChild(temp).appendChild(hum);
        containerEl.appendChild(card);
      });
    });
}
