//import { solo } from './helper';
/*require('dotenv').config();
const apiKey = process.env.API_KEY;*/

//API ket and URLS
const apiKey = "5db5e4ef60984c94955a5cc9c42e0c46";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const hourlyWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
const dailyWeatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily";

//page elements
const city = "tashkent"; /*document.getElementById("#search-input")*/
const submit = document.querySelector(".search-submit");

//get current forecast function
const getCurrentForecast = async () => {
  const currentUrlToFetch = `${currentWeatherUrl}?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(currentUrlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

//current forecast function
const getHourlyForecast = async () => {
  const hourlyUrlToFetch = `${hourlyWeatherUrl}?q=${city}&cnt=15&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(hourlyUrlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

//get daily forecast function
const getDailyForecast = async () => {
  try {
    const dailyUrlToFetch = `${dailyWeatherUrl}?q=${city}&cnt=7&units=metric&appid=${apiKey}`;
    const response = await fetch(dailyUrlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderCurrentForecast = (currentDay) => {
  //change city name
  const cityName = document.getElementById("city-name");
  cityName.innerHTML = currentDay.name;
  //change current date
  const todaysDate = document.getElementById("todays-date");
  const date = new Date();
  todaysDate.innerHTML = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //change weather condition
  const weatherCondition = document.querySelector(".weather-condition");
  weatherCondition.style.textTransform = "capitalize";
  weatherCondition.innerHTML = currentDay.weather[0].description;

  //change current temperature
  const curTemp = document.querySelector(".cur-temp");
  curTemp.innerHTML = currentDay.main.temp.toFixed() + "&#176;";
  console.log(currentDay);
  //change current large weather icon
  const largeWeatherIcon = document.querySelector(".large-weather-icon");
  largeWeatherIcon.src =
    "http://openweathermap.org/img/wn/" +
    currentDay.weather[0].icon +
    "@2x.png";
  console.log(currentDay.weather[0].icon);
  //change current humidity not daily humidity
  const humidityDegree = document.querySelector(".humidity-deg");
  humidityDegree.innerHTML = currentDay.main.humidity + "%";

  //chnage current feels like
  const feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = currentDay.main.feels_like.toFixed() + "&#176;";

  //change current cloudiness level
  const clouds = document.querySelector(".clouds");
  clouds.innerHTML = currentDay.clouds.all + "%";

  //change wind direction
  const direction = document.querySelector(".direction");
  if (currentDay.wind.deg > 0 && currentDay.wind.deg < 90) {
    direction.innerHTML = "North-east";
  } else if (currentDay.wind.deg > 90 && currentDay.wind.deg < 180) {
    direction.innerHTML = "South-east";
  } else if (currentDay.wind.deg > 180 && currentDay.wind.deg < 270) {
    direction.innerHTML = "South-west";
  } else if (currentDay.wind.deg > 270 && currentDay.wind.deg < 360) {
    direction.innerHTML = "North-west";
  }

  const speed = document.querySelector(".speed");
  speed.innerHTML = ((currentDay.wind.speed * 3600) / 1000).toFixed() + " km/h";
};

const renderHourlyForecast = (hourly) => {
  console.log(hourly);
  const today = new Date();
  const now = 9;
  console.log(now);

  const createHourlyForecast = () => {
    const date = document.querySelectorAll(".date");
    const icon = document.querySelectorAll(".hourly-icon");
    const deg = document.querySelectorAll(".hourly-degree");
    //the number dicatates from which index number of time slots the following loop should start
    let slotNum = 2;
    for (let i = 0; i < date.length; i++) {
      date[i].innerHTML = hourly.list[slotNum].dt_txt.slice(11, 16);
      icon[i].src =
        "http://openweathermap.org/img/wn/" +
        hourly.list[slotNum].weather[0].icon +
        "@2x.png";
      deg[i].innerHTML = hourly.list[slotNum].main.temp.toFixed() + "&deg;";
      slotNum++;
    }
  };

  createHourlyForecast();
};

const renderDailyForecast = (daily) => {
  //change min and max temp
  const minMaxtTmp = document.querySelector(".min-max-temp");
  minMaxtTmp.innerHTML = `${daily.list[0].temp.max.toFixed()}&#176; / ${daily.list[0].temp.min.toFixed()}&#176;`;
  console.log(new Date(daily.list[0].dt * 1000).toString());
  console.log(new Date(1630461600 * 1000).toString());

  const createDailyForecast = () => {
    const date = document.querySelectorAll(".day");
    const icon = document.querySelectorAll(".daily-icon");
    const deg = document.querySelectorAll(".daily-min-max");

    for (let i = 0; i < date.length; i++) {
      date[i].innerHTML = new Date(
        daily.list[i + 1].dt * 1000
      ).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      icon[i].src =
        "http://openweathermap.org/img/wn/" +
        daily.list[i + 1].weather[0].icon +
        "@2x.png";
      deg[i].innerHTML =
        daily.list[i].temp.max.toFixed() +
        "&deg; / " +
        daily.list[i + 1].temp.min.toFixed() +
        "&deg;";
    }
  };

  createDailyForecast();
};
//execute current search function
const executeCurrentSearch = () => {
  getCurrentForecast().then((forecast) => {
    return renderCurrentForecast(forecast);
  });
};

//execute current search function
const executeHourlySearch = () => {
  getHourlyForecast().then((forecast) => {
    return renderHourlyForecast(forecast);
  });
};

//execute daily search function
const executeDailySearch = () => {
  getDailyForecast().then((forecast) => {
    console.log(forecast);
    return renderDailyForecast(forecast);
  });
};
const executeAllSearch = () => {
  executeCurrentSearch();
  executeHourlySearch();
  executeDailySearch();
};

executeAllSearch();
/*submit.addEventListener("click", () => {
  executeAllSearch();
});*/

/*export and import helper function*/
