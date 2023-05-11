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

async function showWeather(cityName, t) {
    let forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=743de223cc0b4853820165044231005&q=${cityName}&days=3`, {mode: 'cors'});
    let forecastWeather = await forecast.json();
    console.log(forecastWeather);
    
    if(forecast.status == 200) {
      h1.textContent = `${forecastWeather.location.name}`;
      lastUpdate.textContent= `(last update: ${forecastWeather.current.last_updated.slice(11)} local time)`;
      currentTemp.textContent = `${forecastWeather.current.temp_c} °C`
      conditionText.textContent = forecastWeather.current.condition.text;
      currentImg.src = `./images${forecastWeather.current.condition.icon.slice(34)}`;
      currentMaxTemp.textContent = `Max: ${forecastWeather.forecast.forecastday[0].day.maxtemp_c} °C`;
      currentMinTemp.textContent = `Min: ${forecastWeather.forecast.forecastday[0].day.mintemp_c} °C`;
      loader.style.visibility = 'hidden';
    } else {
      h1.textContent = forecastWeather.error.message;
      loader.style.visibility = 'hidden';
    };
};

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && input.value != '') {
    loader.style.visibility = 'visible';
    showWeather(input.value);
  };
});

unitToggle.addEventListener('click', (e) => {
    unitToggle.style.justifyContent = unitToggle.style.justifyContent == 'flex-start' ? 'flex-end' : 'flex-start';
    tempC.style.visibility = tempC.style.visibility == 'visible' ? 'hidden' : 'visible';
    tempF.style.visibility = tempF.style.visibility == 'hidden' ? 'visible' : 'hidden';
});



