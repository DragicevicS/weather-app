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
const dayOfTheWeek = document.querySelectorAll('day-of-the-week');

const additionalInfoDiv = document.querySelector('.additional-info-div');
const infoP = document.querySelectorAll('.info-p');

async function showWeather(cityName, t) {
    // getting data from weatherAPI
    let forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=743de223cc0b4853820165044231005&q=${cityName}&days=3`, {mode: 'cors'});
    let forecastWeather = await forecast.json();
    console.log(forecastWeather);
    
    if (forecast.status == 200) { // checking if the connection was ok
      // showing weather info
      h1.textContent = `${forecastWeather.location.name}`;
      lastUpdate.textContent= `(last update: ${forecastWeather.current.last_updated.slice(11)} local time)`;
      conditionText.textContent = forecastWeather.current.condition.text;
      currentImg.src = `./images${forecastWeather.current.condition.icon.slice(34)}`;
      currentImg.style.display = 'flex';
      dayToDayDiv.style.visibility = 'visible';

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

        infoP[1].textContent = `${forecastWeather.current.pressure_mb} mb`;
        infoP[2].textContent = `${forecastWeather.current.wind_kph} kph`;
        infoP[3].textContent = `${forecastWeather.current.vis_km} km`;
      }
      if (t == 'f'){
        currentTemp.textContent = `${forecastWeather.current.temp_f} °F`
        currentMaxTemp.textContent = `Max: ${forecastWeather.forecast.forecastday[0].day.maxtemp_f} °F`;
        currentMinTemp.textContent = `Min: ${forecastWeather.forecast.forecastday[0].day.mintemp_f} °F`;
        loader.style.visibility = 'hidden';

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



