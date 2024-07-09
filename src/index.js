searchFormElement = document.querySelector("#search-form");


function handleSearchSubmit(event) {
    event.preventDefault();
    searchInput = document.querySelector("#search-form-input");
    cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = searchInput.value;
    console.log(cityElement)
}

searchFormElement.addEventListener("click", handleSearchSubmit);