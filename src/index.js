import "./styles.css";
import { createClient } from 'pexels';

async function getPhoto(query = 'sky'){
    const client = createClient('7u3DN54OPhwE6qLJxQSKWJyTp0lz2gMpz6yWbehbv0QumL3lhxOGunaT');
    const adress = await client.photos.search({query, per_page: 1, orientation: 'landscape'});
    const photo = await adress.photos[0].src['original'];
    document.querySelector('#main-container').style.backgroundImage=`url(${photo})`;
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
    if (temp.classList.contains('celsius')){
        temp.textContent = FtoC(weatherData.currentConditions.temp); 
        feelsLike.textContent = `Feels like: ${FtoC(weatherData.currentConditions.feelslike)}`; 
    }else{
        temp.textContent = Math.round(weatherData.currentConditions.temp); 
        feelsLike.textContent = `Feels like: ${Math.round(weatherData.currentConditions.feelslike)}`; 
    }
    
    wind.textContent = `Wind: ${weatherData.currentConditions.windspeed} MPH`;
    humidity.textContent = `Humidity: ${weatherData.currentConditions.humidity} %`;
    getPhoto(weatherData.description);
}

const search = document.querySelector('#search');
const switchBtn = document.querySelector('.switch-btn');

function FtoC(temp){
    return Math.round((parseFloat(temp) - 32) * 5/9)
}

function CtoF(temp){
    return Math.round((parseFloat(temp) * 9/5) + 32)
}

search.addEventListener('click', () => {
    const city = document.querySelector('#city');
    getWeatherInfo(city.value);
    city.value = '';
})

document.addEventListener('keypress', (e) => {
    if (e.code === 'Enter'){
        const city = document.querySelector('#city');
        getWeatherInfo(city.value);
        city.value = '';
    }
})

switchBtn.addEventListener('click', () => {
    const temperature = document.querySelector('#temperature'),
          feelsLike = document.querySelector('#feels-like');
    switchBtn.classList.toggle('switch-on');
    temperature.classList.toggle('celsius');
    feelsLike.classList.toggle('celsius');
    if (switchBtn.classList.contains('switch-on')) {
        temperature.textContent = FtoC(temperature.textContent);
        feelsLike.textContent = `Feels like: ${FtoC(feelsLike.textContent.split(': ')[1])}`
    }else{
        temperature.textContent = CtoF(temperature.textContent);
        feelsLike.textContent = `Feels like: ${CtoF(feelsLike.textContent.split(': ')[1])}`
    }   
})

getWeatherInfo();