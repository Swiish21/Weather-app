//stores the api key needed to authenicate requests to the api
const apiKey = "deceaf16f47a889a68f1ee288e33474e";

//sets the base url for the weather map api endpoint
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

//selects the html input element where the user will enter their location
const locationInput = document.getElementById("location_input");

//selects the html button element where the user will click to search
const searchButton = document.getElementById("searchButton");

//selects the html element where the location will be displayed
const locationElement = document.getElementById("location");

//selects the html element where the temperature will be displayed
const temperatureElement = document.getElementById("temperature");

//selects the html element where the description will be displayed
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
    //gets the value of the location input
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey} &units=metric`;
    //defines a function that constructs the api request url using the location input
    //api key, and units set to metric

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Weather data not available for the entered location");
            }
            return response.json();
        })
        //sends a GET request to the OpenWeather API, checks if the response is successful
        //and converts the response to JSON

        .then((data) => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        //updates the html elements with the location, temperature,
        //and description of the weather

        .catch((error) => {
            console.error("Error fetching weather data:", error);
            locationElement.textContent = "Error fetching weather data";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "";
        });
        //handles any errors that occur while fetching the weather data
        //and updating the html elements to indicate the failure
}