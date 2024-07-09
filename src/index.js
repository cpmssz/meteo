searchFormElement = document.querySelector("#search-form");

function updateWeather(response) {
    console.log(response.data);
    temperatureElement = document.querySelector("#temperature");
    temperature = response.data.main.temp;
    cityElement = document.querySelector("#weather-app-city"); // or just #city (week7-Lesson7-typing a city with errors)
    cityElement.innerHTML =  response.data.name; // searchInput.value; 
    
    temperatureElement.innerHTML = Math.round(temperature);
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