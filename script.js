const apiKey = "deceaf16f47a889a68f1ee288e33474e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("location_input");
const searchButton = document.getElementById("searchButton");

const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Weather data not available for the entered location");
            }
            return response.json();
        })
        .then((data) => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            locationElement.textContent = "Error fetching weather data";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "";
        });
}
