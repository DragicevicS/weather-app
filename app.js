const content = document.querySelector('.content');

const input = document.querySelector('input');
const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', () => {
  const city = input.value;

  async function showForecast (data) {
    let weatherAPI = await fetch(`https://api.weatherapi.com/v1/current.json?key=743de223cc0b4853820165044231005&q=${data}`);
    let forecast = await weatherAPI.json();
    
    console.log(forecast);
  
    content.lastElementChild.textContent = `
    Weather forecast for: ${forecast.location.name}
    °C: ${forecast.current.temp_c}
    °F: ${forecast.current.temp_f}
    `;
  };

  showForecast(city);
});


