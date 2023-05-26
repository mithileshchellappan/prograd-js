const apiKey = '7bad00f2e703564969a401a2d81059a1';
const BASE_URL = `https://api.openweathermap.org`
const citySelect = document.getElementById('city');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const windDescription = document.getElementById('wind-description');
const feelsLike = document.getElementById('feels-like');
const weatherInfo = document.getElementById('weather-info');
const sunRiseSet = document.getElementById('sunrise-set')
const forecastContainer = document.getElementById('forecast-container');

var cities = ['Salem', 'Delhi', 'New York', 'Chennai', 'San Fransisco', 'Abu Dhabi', 'Cairo', 'Buenos Aires', 'Coimbatore', 'New Delhi', 'Thoothukudi']

cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.toLowerCase()
    option.textContent = city
    citySelect.appendChild(option)
})

citySelect.addEventListener('change',async () => {
    const selectedCity = citySelect.value;
    console.log('inside');
    if (selectedCity) {
        var data = await getWeather(selectedCity)
        showWeatherData(data);
        var forecastData = await getForecast(selectedCity)
        showForecastData(forecastData)
    } else {
        weatherInfo.style.opacity = '0';
    }
});

async function getWeather(city) {

    const url = `${BASE_URL}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

async function getForecast(city) {

    const url = `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

function showWeatherData(data) {
    const icon = data.weather[0].icon;
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    var {country,sunrise,sunset} = data.sys
    cityName.textContent = `${data.name}, ${country}`;
    console.log(data)
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
    console.log(weatherIcon.src);
    temperature.textContent = `${temp.toFixed(1)}°C`
    weatherDescription.textContent = desc;
    weatherInfo.style.opacity = '1';
    const {feels_like} = data.main
    if(feels_like-temp >=2 || temp-feels_like <=-2){
        feelsLike.textContent = `Feels Like: ${feels_like.toFixed(1)}°C`
    }else{
        feelsLike.textContent = ''
    }
    var { deg, speed } = data.wind
    windDescription.textContent = `Deg: ${deg} | Speed: ${speed} m/s`
    sunrise = sunrise*1000;sunset=sunset*1000
    var sunRiseTime = new Date(sunrise).toLocaleTimeString('en-us',{hour12:true,hour:'numeric',minute:'2-digit'})
    var sunSetTime = new Date(sunset).toLocaleTimeString('en-us',{hour12:true,hour:'numeric',minute:'2-digit'})
    console.log(sunRiseTime,sunSetTime);
    sunRiseSet.textContent = `🌅: ${sunRiseTime} 🌇: ${sunSetTime}`
    weatherInfo.classList.add('fade-in');
}


function showForecastData(data) {
    const forecastContainer = document.querySelector('.grid-cols-1');
    forecastContainer.classList.add('slide-up');
    const uniqueDates = {}
    forecastContainer.innerHTML = ''; 
    const forecasts = data.list.reduce((acc,obj)=>{
        const date = obj.dt_txt.split(' ')[0]
        if(!uniqueDates[date]){
            uniqueDates[date] = true;
            acc.push(obj)
        }
        return acc
    },[]) 
    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
      const icon = forecast.weather[0].icon;
      const temp = forecast.main.temp.toFixed(1);
      const desc = forecast.weather[0].description;
  
      const forecastCard = document.createElement('div');
      forecastCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4');
  
      const forecastDay = document.createElement('h3');
      forecastDay.classList.add('text-lg', 'font-bold');
      forecastDay.textContent = date;
  
      const forecastIcon = document.createElement('img');
      forecastIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
      forecastIcon.alt = 'Weather Icon';
      forecastIcon.classList.add('w-12', 'mt-2');
  
      const forecastTemp = document.createElement('p');
      forecastTemp.classList.add('text-xl', 'font-bold', 'mt-2');
      forecastTemp.textContent = `${temp}°C`;
  
      const forecastDesc = document.createElement('p');
      forecastDesc.classList.add('text-sm');
      forecastDesc.textContent = desc;
  
      forecastCard.appendChild(forecastDay);
      forecastCard.appendChild(forecastIcon);
      forecastCard.appendChild(forecastTemp);
      forecastCard.appendChild(forecastDesc);
  
      forecastContainer.appendChild(forecastCard);
    });
  }
  