const input = document.querySelector('input');
const loader = document.querySelector('.loader');
const unitToggle = document.querySelector('.unit-toggle');
const tempC = document.querySelector('.temp-c');
const tempF = document.querySelector('.temp-f');
const currentDiv = document.querySelector('.current-div');
const h1 = document.querySelector('h1');
const lastUpdate = document.querySelector('.last-update');
const currentTemp = document.querySelector('.current-temp');
const conditionText = document.querySelector('.condition-text');
const currentImg = document.querySelector('.current-img');
const currentMaxTemp = document.querySelector('.current-max-temp');
const currentMinTemp = document.querySelector('.current-min-temp');

const dayToDayDiv = document.querySelector('.day-to-day-div');
const h3 = document.querySelector('h3');
const dayOfWeek = document.querySelectorAll('.day-of-week');
const dayOfWeekImg = document.querySelectorAll('.day-of-week-img');
const minMaxTemp = document.querySelectorAll('.min-max-temp');
const avgTemp = document.querySelectorAll('.avg-temp');
const chanceOfRain = document.querySelectorAll('.chance-of-rain');

const additionalInfoDiv = document.querySelector('.additional-info-div');
const infoP = document.querySelectorAll('.info-p');

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let today = `${year}-${month}-${day}`;
let yesterday = `${year}-${month}-${day - 1}`;
let dayBeforeYesterday = `${year}-${month}-${day - 2}`;
let tomorrow = `${year}-${month}-${day + 1}`;
let dayAfterTomorrow = `${year}-${month}-${day + 2}`;

async function showWeather(cityName, t) {
    // getting data from weatherAPI
    let forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=743de223cc0b4853820165044231005&q=${cityName}&days=3`, {mode: 'cors'});
    let yesterdayForecast = await fetch(`https://api.weatherapi.com/v1/history.json?key=743de223cc0b4853820165044231005&q=${cityName}&dt=${yesterday}`, {mode: 'cors'});
    let dayBeforeYesterdayForecast = await fetch(`https://api.weatherapi.com/v1/history.json?key=743de223cc0b4853820165044231005&q=${cityName}&dt=${dayBeforeYesterday}`, {mode: 'cors'});
    let forecastWeather = await forecast.json();
    let yesterdayWeather = await yesterdayForecast.json();
    let dayBeforeYesterdayWeather = await dayBeforeYesterdayForecast.json();
    console.log(forecastWeather, yesterdayWeather, dayBeforeYesterdayWeather);
    
    if (forecast.status == 200) { // checking if the connection was ok
      // showing weather info
      h1.textContent = `${forecastWeather.location.name}`;
      lastUpdate.textContent= `(last update: ${forecastWeather.current.last_updated.slice(11)}h local time)`;
      conditionText.textContent = forecastWeather.current.condition.text;
      currentImg.src = `./images${forecastWeather.current.condition.icon.slice(34)}`;
      currentImg.style.display = 'flex';

      h3.style.visibility = 'visible';
      dayToDayDiv.style.visibility = 'visible';
      dayOfWeek[0].textContent = new Date(dayBeforeYesterday).toDateString().slice(0, 3);
      dayOfWeekImg[0].src = `./images${dayBeforeYesterdayWeather.forecast.forecastday[0].day.condition.icon.slice(34)}`;
      dayOfWeekImg[0].title = dayBeforeYesterdayWeather.forecast.forecastday[0].day.condition.text;
      chanceOfRain[0].textContent = `${dayBeforeYesterdayWeather.forecast.forecastday[0].day.avghumidity}%`;

      dayOfWeek[1].textContent = new Date(yesterday).toDateString().slice(0, 3);
      dayOfWeekImg[1].src = `./images${yesterdayWeather.forecast.forecastday[0].day.condition.icon.slice(34)}`;
      dayOfWeekImg[1].title = yesterdayWeather.forecast.forecastday[0].day.condition.text;
      chanceOfRain[1].textContent = `${yesterdayWeather.forecast.forecastday[0].day.avghumidity}%`;

      dayOfWeekImg[2].src = `./images${forecastWeather.forecast.forecastday[0].day.condition.icon.slice(34)}`;
      dayOfWeekImg[2].title = forecastWeather.forecast.forecastday[0].day.condition.text;
      chanceOfRain[2].textContent = `${forecastWeather.forecast.forecastday[0].day.avghumidity}%`;

      dayOfWeek[3].textContent = new Date(tomorrow).toDateString().slice(0, 3);
      dayOfWeekImg[3].src = `./images${forecastWeather.forecast.forecastday[1].day.condition.icon.slice(34)}`;
      dayOfWeekImg[3].title = forecastWeather.forecast.forecastday[1].day.condition.text;
      chanceOfRain[3].textContent = `${forecastWeather.forecast.forecastday[1].day.avghumidity}%`;

      dayOfWeek[4].textContent = new Date(dayAfterTomorrow).toDateString().slice(0, 3);
      dayOfWeekImg[4].src = `./images${forecastWeather.forecast.forecastday[2].day.condition.icon.slice(34)}`;
      dayOfWeekImg[4].title = forecastWeather.forecast.forecastday[2].day.condition.text;
      chanceOfRain[4].textContent = `${forecastWeather.forecast.forecastday[2].day.avghumidity}%`;

      additionalInfoDiv.style.visibility = 'visible';
      infoP[0].textContent = `${forecastWeather.current.humidity}%`;
      infoP[4].textContent = forecastWeather.forecast.forecastday[0].astro.sunrise;
      infoP[5].textContent = forecastWeather.forecast.forecastday[0].astro.sunset;

      // displaying °C or °F based on the slider position
      if (t == 'c') {
        currentTemp.textContent = `${forecastWeather.current.temp_c} °C`
        currentMaxTemp.textContent = `Max: ${forecastWeather.forecast.forecastday[0].day.maxtemp_c} °C`;
        currentMinTemp.textContent = `Min: ${forecastWeather.forecast.forecastday[0].day.mintemp_c} °C`;
        loader.style.visibility = 'hidden';


        avgTemp[0].textContent = `${Math.round(dayBeforeYesterdayWeather.forecast.forecastday[0].day.avgtemp_c)} °C`;
        minMaxTemp[0].textContent = `${Math.round(dayBeforeYesterdayWeather.forecast.forecastday[0].day.mintemp_c)}° / ${Math.round(dayBeforeYesterdayWeather.forecast.forecastday[0].day.maxtemp_c)}°`;
        avgTemp[1].textContent = `${Math.round(yesterdayWeather.forecast.forecastday[0].day.avgtemp_c)} °C`;
        minMaxTemp[1].textContent = `${Math.round(yesterdayWeather.forecast.forecastday[0].day.mintemp_c)}° / ${Math.round(yesterdayWeather.forecast.forecastday[0].day.maxtemp_c)}°`;
        avgTemp[2].textContent = `${Math.round(forecastWeather.forecast.forecastday[0].day.avgtemp_c)} °C`;
        minMaxTemp[2].textContent = `${Math.round(forecastWeather.forecast.forecastday[0].day.mintemp_c)}° / ${Math.round(forecastWeather.forecast.forecastday[0].day.maxtemp_c)}°`;
        avgTemp[3].textContent = `${Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_c)} °C`;
        minMaxTemp[3].textContent = `${Math.round(forecastWeather.forecast.forecastday[1].day.mintemp_c)}° / ${Math.round(forecastWeather.forecast.forecastday[1].day.maxtemp_c)}°`;
        avgTemp[4].textContent = `${Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_c)} °C`;
        minMaxTemp[4].textContent = `${Math.round(forecastWeather.forecast.forecastday[2].day.mintemp_c)}° / ${Math.round(forecastWeather.forecast.forecastday[2].day.maxtemp_c)}°`;

        infoP[1].textContent = `${forecastWeather.current.pressure_mb} mb`;
        infoP[2].textContent = `${forecastWeather.current.wind_kph} kph`;
        infoP[3].textContent = `${forecastWeather.current.vis_km} km`;
      }
      if (t == 'f'){
        currentTemp.textContent = `${forecastWeather.current.temp_f} °F`
        currentMaxTemp.textContent = `Max: ${forecastWeather.forecast.forecastday[0].day.maxtemp_f} °F`;
        currentMinTemp.textContent = `Min: ${forecastWeather.forecast.forecastday[0].day.mintemp_f} °F`;
        loader.style.visibility = 'hidden';

        avgTemp[0].textContent = `${Math.round(dayBeforeYesterdayWeather.forecast.forecastday[0].day.avgtemp_f)} °F`;
        minMaxTemp[0].textContent = `${Math.round(dayBeforeYesterdayWeather.forecast.forecastday[0].day.mintemp_f)}° / ${Math.round(dayBeforeYesterdayWeather.forecast.forecastday[0].day.maxtemp_f)}°`;
        avgTemp[1].textContent = `${Math.round(yesterdayWeather.forecast.forecastday[0].day.avgtemp_f)} °F`;
        minMaxTemp[1].textContent = `${Math.round(yesterdayWeather.forecast.forecastday[0].day.mintemp_f)}° / ${Math.round(yesterdayWeather.forecast.forecastday[0].day.maxtemp_f)}°`;
        avgTemp[2].textContent = `${Math.round(forecastWeather.forecast.forecastday[0].day.avgtemp_f)} °F`;
        minMaxTemp[2].textContent = `${Math.round(forecastWeather.forecast.forecastday[0].day.mintemp_f)}° / ${Math.round(forecastWeather.forecast.forecastday[0].day.maxtemp_f)}°`;
        avgTemp[3].textContent = `${Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_f)} °F`;
        minMaxTemp[3].textContent = `${Math.round(forecastWeather.forecast.forecastday[1].day.mintemp_f)}° / ${Math.round(forecastWeather.forecast.forecastday[1].day.maxtemp_f)}°`;
        avgTemp[4].textContent = `${Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_f)} °F`;
        minMaxTemp[4].textContent = `${Math.round(forecastWeather.forecast.forecastday[2].day.mintemp_f)}° / ${Math.round(forecastWeather.forecast.forecastday[2].day.maxtemp_f)}°`;

        infoP[1].textContent = `${forecastWeather.current.pressure_in} in`;
        infoP[2].textContent = `${forecastWeather.current.wind_mph} mph`;
        infoP[3].textContent = `${forecastWeather.current.vis_miles} miles`;
      }
    } else { // hiding everything and displaying the error message
      lastUpdate.textContent = '';
      currentTemp.textContent = '';
      conditionText.textContent = '';
      currentImg.style.display = 'none';
      currentMaxTemp.textContent = '';
      currentMinTemp.textContent = '';
      h1.textContent = forecastWeather.error.message;
      loader.style.visibility = 'hidden';
      h3.style.visibility = 'hidden';
      dayToDayDiv.style.visibility = 'hidden';
      additionalInfoDiv.style.visibility = 'hidden';
    };
};

input.addEventListener("keypress", (e) => { // using "Enter" key to display weather info
  if (e.key === "Enter" && input.value != '') {
    loader.style.visibility = 'visible';
    if (tempC.style.visibility == 'visible') showWeather(input.value, 'c');
    if (tempF.style.visibility == 'visible') showWeather(input.value, 'f');
  };
});

unitToggle.addEventListener('click', (e) => { // toggling displayed units
    unitToggle.style.justifyContent = unitToggle.style.justifyContent == 'flex-start' ? 'flex-end' : 'flex-start';
    tempC.style.visibility = tempC.style.visibility == 'visible' ? 'hidden' : 'visible';
    tempF.style.visibility = tempF.style.visibility == 'hidden' ? 'visible' : 'hidden';
    if (tempC.style.visibility == 'visible' && input.value != '')showWeather(input.value, 'c');
    if (tempF.style.visibility == 'visible' && input.value != '')showWeather(input.value, 'f');
});



