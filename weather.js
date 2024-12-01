function getWeather() {
    const apiKey ='Api key goes here';
    const city = document.getElementById('city').value;

    if (!city) {
        alert ('Please Enter A City');
        return;
    }

    const currentWeatherUrl = `//this is where my weather website url will be ${city} ${apiKey}`;
    const forecastUrl = `//this is where my weather website url will be ${city} ${apiKey}`;





fetch (currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert ('Error fetching current weather data. Please try again');
    });

    fetch(forecastUrl)
    .then (response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert ('Error fetching hourly forecast data. Please try again');
    });

}

        function displayWeather(data) {
        const tempDivInfo = document.getElementById('temp');
        const weatherInfoDiv = document.getElementById('w-info');
        const weatherIcon = document.getElementById('w-icon');
        const hourlyForecastDiv = document.getElementById('h-forecast');

        weatherInfoDiv.innerHTML= '';
        tempDivInfo.innerHTML = '';
        hourlyForecastDiv.innerHTML = '';
    

     
        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p> ${data.message} </p>`;
        } else {
            const cityName = data.name;
            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `${iconCode}@4x.png`;
        
            const temperatureHtml = ` <p> ${temperature}C </p>`;
            const weatherHtml = ` <p>${cityName}</p> <p>${description}</p>`;
            
            tempDivInfo.innerHTML = temperatureHtml;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;

            showImage();
        }
    }

    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('h-forecast');
        const next24Hours = hourlyData.slice(0, 8);

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt*1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `${iconCode}.png`;

            const hourlyItemHtml = `
            <div class="hourly-item>
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon>
            <span>${temperature}C </span>
            </div> `;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }


    function showImage(){
        const weatherIcon = document.getElementById('w-icon');
        weatherIcon.style.display= 'block';
    }
