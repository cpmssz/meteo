searchFormElement = document.querySelector("#search-form");

function updateWeather(response) {
//    console.log(response.data);
    temperatureElement = document.querySelector("#temperature");
    temperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(temperature); // or Math.round(response.data.main.temp). Without the previous step and variable.

    cityElement = document.querySelector("#weather-app-city"); // or just #city (week7-Lesson7-typing a city with errors)
    cityElement.innerHTML =  response.data.name; // searchInput.value; 

    
    let date = new Date(response.data.dt * 1000); // correct way of converting a Unix timestamp date format to time in Javascript;
    timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatDate(date);

    function formatDate(date) {

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let day = date.getDay();

        let days = [ 
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
        
        let currentDay = days[day]; // or: let day=days[date.getDay()];

        if (minutes < 10) {
            minutes = `0${minutes}`;
          }
        
        return `${currentDay} ${hours}:${minutes}`;
    }        

    descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.main.humidity}%`;

    
    windSpeedElement = document.querySelector("#wind");
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" class="weather-app-icon" />`;
    console.log(iconElement)
} 

function searchCity(city) {
    let apiKey = "e6c2364656962bdcb16bc352fc42569a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather); 
}
    

function handleSearchSubmit(event) {
    event.preventDefault();
    searchInput = document.querySelector("#search-form-input");
 
    searchCity(searchInput.value);
}

searchFormElement.addEventListener("click", handleSearchSubmit);

searchCity("Paris");