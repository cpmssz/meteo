searchFormElement = document.querySelector("#search-form");

function updateWeather(response) {
    console.log(response.data);
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

function displayForecast() {
    let forecastElement = document.querySelector("#weather-forecast");
    
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
    let forecastHtml = ""; 

    days.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml=  
                forecastHtml +  
                ` 
                <div class="weather-forecast-day"> 
                    <div class="weather-forecast-date">${day}</div>
                    <img
                        src="https://openweathermap.org/img/wn/04d@2x.png"
                        alt=""
                        width="45"
                        class="weather-forecast-icon"
                     />
                
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">18º</span>
                        <span class="weather-forecast-temperature-min">12º</span>
                    </div>
                </div>
            `;
        }
    })

    /* nota: JS reconhece html - por isso dizemos que é possível injectar html diretamente de JS (JS Template - correct term for this). Por isso não reconhece comments quando os tentamos fazer na parte de html, como os <div>. 
     Tivemos de incluir a classe na linha 84, para que ficasse tudo na mesma coluna (cada loop). Ou seja, os dados para cada dia. 
        Isto porque estamos a usar a técnica display flex, que coloca a classe em que a aplicamos, como a linha (equivalente a "row" em Bootstrap - neste caso - a classe "weather-forecast" - html). 
        E, depois, cada elemento, dentro desta classe, funciona como uma coluna (assim, como temos vários <div> cada um ficaria numa coluna diferente). Para isso, criamos a classe "day" que representa uma coluna (dentro da classe weather-forecast, aqui selecionada através do id).
        E, colocamos todos os outros elementos, dentro desta classe. Assim, ficam todos dentro desta coluna. 
        Como são block elements, é criada uma linha antes e após cada um - portanto, ficam em linhas diferentes (dentro da mesma coluna). 
            Com excepção da img (que é inline). Mas, como está entre 2 block elements fica em linhas diferentes desses 2 <divs>.
            Neste caso, colocamos as temperaturas max e min (como span, ficando dentro na mesma linha // lado-a-lado). Mas, poderíamos tê-las colocado em div elements. E, depois, do css file, colocávamos a classe superior (forecast-temperatures) como display:flex; justify:center; -> E teria exatamente o mesmo efeito;
    */ 

    forecastElement.innerHTML = forecastHtml;
}

displayForecast();

