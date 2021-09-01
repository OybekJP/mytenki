//API key. Left it public because it is a free account and anyone can create one
//it is impossible to hide an api key on client side even with .env and .gitignore.
//only way to hide it is to use backend server.
//at this point I am not familiar with backend, so, I will not hide the key
const apiKey = "dfe6ec98ed8dc1c173eaa331d84f0de2";

//API url endpoints. There 3 Openweather API urls because each one of them have the data we need
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const hourlyWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
const dailyWeatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily";

//select page elements
//for the inputted city name, don't access its .value here yet. access the .value inside urlToFetch variables
const city = document.querySelector("#search-input");
const search = document.querySelector(".search-btn");
const forecastContainer = document.querySelector(".forecast-container");
const dailyContainer = document.querySelector(".daily-container");
const humidityContainer = document.querySelector(".humidity-container");
const windContainer = document.querySelector(".wind-container");
const errorM = document.querySelector(".error");

//get current forecast function
const getCurrentForecast = async () => {
  const currentUrlToFetch = `${currentWeatherUrl}?q=${city.value}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(currentUrlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      //displays our forecast details if API request works fine
      forecastContainer.style.display = "inherit";
      dailyContainer.style.display = "inherit";
      humidityContainer.style.display = "inherit";
      windContainer.style.display = "inherit";
      windContainer.style.display = "inherit";

      //hide error message when API request is successful
      errorM.style.display = "none";
      return jsonResponse;
    } else if (!response.ok) {
      //hide initial html or last search forecast results when new api reques t for new location is unsuccessful
      forecastContainer.style.display = "none";
      dailyContainer.style.display = "none";
      humidityContainer.style.display = "none";
      windContainer.style.display = "none";
      windContainer.style.display = "none";

      //display error message when API request is unsuccessul
      errorM.style.display = "inherit";
      errorM.innerHTML = "Please insert a correct city name.";
    }
  } catch (error) {
    console.log(error);
  }
};

//current forecast function
const getHourlyForecast = async () => {
  const hourlyUrlToFetch = `${hourlyWeatherUrl}?q=${city.value}&cnt=15&units=metric&appid=${apiKey}`;
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
    const dailyUrlToFetch = `${dailyWeatherUrl}?q=${city.value}&cnt=7&units=metric&appid=${apiKey}`;
    const response = await fetch(dailyUrlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

//the function will change some html (mainly data about current weather forecast) with the data received from API
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

//the function will change some html (mainly data about hourly weather forecast) with the data received from API
const renderHourlyForecast = (hourly) => {
  console.log(hourly);
  const currentHour = new Date().getHours();
  console.log(hourly.list.length);
  for (let i = 0; i < hourly.list.length; i++) {}
  console.log(currentHour);

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

//the function will change some html (mainly data about daily weather forecast) with the data received from API
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

    //append daily content like dates, coreesponding icons and min-max temps
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

//the funciotn executes/calls the getCurrentForecast function that fetches our API request and uses the resolved response to add html using renderCurrentForecast
const executeCurrentSearch = () => {
  getCurrentForecast().then((forecast) => {
    return renderCurrentForecast(forecast);
  });
};

//execute hourly search function
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

//the function executes all 3, current, hourly and daily related fucntions
const executeAllSearch = () => {
  executeCurrentSearch();
  executeHourlySearch();
  executeDailySearch();
};

//an event listener which executes executeAll Search function when user clicks submit button
search.addEventListener("click", () => {
  executeAllSearch();
});
//execute search when user hits enter key in the input field
//an event listener which executes executeAllSearch function when user hits enter key
city.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    executeAllSearch();
  }
});
