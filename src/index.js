import "./styles.css";

async function getWeatherInfo(location = 'london'){

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${Date.now().toString().slice(0, 10)}?key=A58BLS2KXH4Q7BGEBG2KRWNK5`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData.currentConditions.temp, 
                weatherData.currentConditions.feelslike, 
                weatherData.currentConditions.windspeed, 
                weatherData.currentConditions.humidity);
}

getWeatherInfo('Moscow');