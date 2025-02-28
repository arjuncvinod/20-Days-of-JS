const apiKey = 'bdc1146c700b7ab3cbbd22c72a75063f';  key

async function getWeather() {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = `<p>City not found. Try again.</p>`;
        } else {
            document.getElementById("weatherResult").innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
