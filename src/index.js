import "./styles.css";

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
}

getWeatherInfo();