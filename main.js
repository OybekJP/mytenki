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

const getForecast = async () => {
  //array to save current, hourly and daily functions responses
  //order: current, hourly, daily
  let forecastResponseArray = {
    current:'yeah',
    hourly: 'hourly',
    daily: 'daily'
  };

  //current forecast function
  const currentForecast = async () => {
    const currentUrlToFetch = `${currentWeatherUrl}?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(currentUrlToFetch);
      if (response.ok) {
        const jsonResponse = response.json();
        forecastResponseArray.current = jsonResponse;
      }
    } catch (error) {
      console.log(error);
    }
  };
  currentForecast();
  
  //current forecast function
  const hourlyForecast = async () => {
    const hourlyUrlToFetch = `${hourlyWeatherUrl}?q=${city}&cnt=6&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(hourlyUrlToFetch);
      if (response.ok) {
        const jsonResponse = response.json();
        forecastResponseArray.hourly = jsonResponse;
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
  hourlyForecast();
  
  //current forecast function
  const dailyForecast = async () => {
    const dailyUrlToFetch = `${dailyWeatherUrl}?q=${city}&cnt=6&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(dailyUrlToFetch);
      if (response.ok) {
        const jsonResponse = response.json();
        forecastResponseArray.daily = `${jsonResponse}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  dailyForecast();

  console.log(forecastResponseArray);
  return forecastResponseArray;
  //hourly forecast function
  //daily forecast function

  /*//3 urls for current, hourly and daily forecast request services
  const currentUrlToFetch = `${currentWeatherUrl}?q=${city}&units=metric&appid=${apiKey}`;
  const hourlyUrlToFetch = `${hourlyWeatherUrl}?q=${city}&cnt=6&units=metric&appid=${apiKey}`;
  const dailyUrlToFetch = `${dailyWeatherUrl}?q=${city}&cnt=6&units=metric&appid=${apiKey}`;
  //array save 3 api requests
  const urlsArray = [currentUrlToFetch, hourlyUrlToFetch, dailyUrlToFetch];
  console.log(urlsArray);
  try {
    const response = await fetch(urlsArray[2]);
    if (response.ok) {
      const jsonResponse = response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }*/
};

const renderForecast = (day) => {
  let weatherContent = todaysForecast(day);
};

const todaysForecast = (currentDay) => {
  //change city name
  const cityName = document.getElementById("city-name");
  cityName.innerHTML = currentDay[2].name;
  //change current date
  const todaysDate = document.getElementById("todays-date");
  const date = new Date();
  todaysDate.innerHTML = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  //change min and max temp
  const minMaxtTmp = document.querySelector(".min-max-temp");
  minMaxtTmp.innerHTML = `${currentDay[2].list[0].temp.max.toFixed()}&#176; / ${currentDay[2].list[0].temp.min.toFixed()}&#176;`;
  //change weather condition
  const weatherCondition = document.querySelector(".weather-condition");
  weatherCondition.style.textTransform = "capitalize";
  weatherCondition.innerHTML = currentDay.weather[0].description;

  //change current temperature
  const curTemp = document.querySelector(".cur-temp");
  curTemp.innerHTML = currentDay.main.temp.toFixed() + "&#176;";

  //shu blockdan pastda kod yozsam ishlamayapti. shunga tepada yozaman
  //change large weather icon
  const largeWeatherIcon = document.querySelector(".large-weather-icon");
  largeWeatherIcon.src = `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`;
};

const executeSearch = () => {
  getForecast().then((forecast) => {
    return renderForecast(forecast);
  });
};
executeSearch();

/*submit.addEventListener("click", () => {
  executeSearch();
});*/

/*export and import helper function*/
