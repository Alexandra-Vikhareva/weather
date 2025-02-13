import "./styles.css";
import { createClient } from 'pexels';

const client = createClient('7u3DN54OPhwE6qLJxQSKWJyTp0lz2gMpz6yWbehbv0QumL3lhxOGunaT');

async function getPhoto(query = 'sky'){
    const adress = await client.photos.search({query, per_page: 1, orientation: 'landscape'});
    const photo = await adress.photos[0].src['original'];
    const img = document.querySelector('img');
    img.src = photo;
}

async function getWeatherInfo(location = 'london'){

    const locat = document.querySelector('#location'),
          temp = document.querySelector('#temperature'),
          feelsLike  = document.querySelector('#feels-like'),
          wind = document.querySelector('#wind-mph'),
          humidity = document.querySelector('#humidity');

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${Date.now().toString().slice(0, 10)}?key=A58BLS2KXH4Q7BGEBG2KRWNK5`, {mode: 'cors'});
    const weatherData = await response.json();

    locat.textContent = weatherData.resolvedAddress; 
    temp.textContent = weatherData.currentConditions.temp; 
    feelsLike.textContent = `Feels like: ${weatherData.currentConditions.feelslike}`; 
    wind.textContent = `Wind: ${weatherData.currentConditions.windspeed} MPH`;
    humidity.textContent = `Humidity: ${weatherData.currentConditions.humidity} %`;
    getPhoto(weatherData.currentConditions.icon);
}

const search = document.querySelector('#search');

search.addEventListener('click', () => {
    const city = document.querySelector('#city');
    getWeatherInfo(city.value);
})

document.addEventListener('keypress', (e) => {
    if (e.code === 'Enter'){
        const city = document.querySelector('#city');
        getWeatherInfo(city.value);
    }
})

getWeatherInfo();