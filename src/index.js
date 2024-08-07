function refreshWeather(response) { // 3ª função a ser realizada depois de ser efetuada a api call (já com a cidade digitada pelo user) -> recebe, por isso, a resposta da api com todos os dados (objecto JSON). Apenas temos de indicar quais pretendemos retirar e exibir na tela
// console.log(response.data); // é sempre na função callback da api call - que recebe a resposta dessa api - onde imprimimos essa reposta para vermos os nomes das keys que pretendemos. É, por isso, o 1º passo a ser efetuado quando definimos a função callback
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000); // formato para obter a data atual a partir de um UNIX format -> como o disponibilizado pela Api call.
    let iconElement = document.querySelector("#icon");
  
    cityElement.innerHTML = response.data.city; // searchInput.value
    timeElement.innerHTML = formatDate(date); // exibe a data no formato desejado na tela
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`; // icon do current weather (url) -> diferente do icon (com o url do forecast) na linha 83
  
    getForecast(response.data.city); // com isto indicamos a cidade a ser passada à função getForecast -> como está entre (), é reconhecido como o parâmetro da função. Poderíamos ter colocado, antes, o "searchInput.value" (como na linha 54), mas retificamos nesta função para o nome recebido na app (com base no que escrevemos no search engine - portanto tem de ser perceptível para que a api call seja efetuada), de forma a evitar que possíveis erros de digitação sejam exibidos na tela. Seguindo a mesma lógica, enviamos este nome (sem erros) como parâmetro da função getForecast, para que a api call do forecast seja efetuada para esta cidade.
  }
  
  function formatDate(date) { // 4ª função a ser realizada para formatar a data para ser exibida no ecrã no formato desejado
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function searchCity(city) { // 2ª função a ser realizada, que faz a API call com base na cidade que pesquisamos e que recebe como parâmetro da função anterior quando estabelecemos que a função searchCity recebe o valor digitado na tela pelo user -> o que passa dentro de () é estabelecido como parâmetro da função
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather); // refreshWeather é uma função callback (.then -> é um método. Logo, temos uma função que passa como argumento de outra função. Funções callback (como a que passa em eventListeners) são sempre chamadas se argumentos e nunca parâmetros pois o seu valor nunca vai alterar na função onde são chamada -> onde são argumentos. Além disso, o valor que recebem (como argumento) também é sempre o mesmo (pelo menos nestes 2 casos - api call e event Listener - recebem sempre uma response e um event). Não sei se noutros casos, os valores que recebem como parâmetros podem alterar ou não (caso, não são funções que são sempre argumentos - e que recebem sempre argumentos). Mas são sempre argumentos. 
  }
  
  function handleSearchSubmit(event) { // 1ª função a ser realizada, com base na cidade que pesquisamos
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input"); // seleciona mesmo apenas o search engine (onde temos a possibilidade de escrever a cidade - linha 25 (html file) e não todo o form, como o id selecionado na linha 110 - onde se encontra o submit button - linha 28 (html file), ao qual vamos adicionar um evento depois de escrevermos a cidade e submetermos essa resposta -> ou seja, depois de usarmos o submit button (ou Enter)).
  
    searchCity(searchInput.value); // contudo, funções callback (-> que são sempre argumentos das funções onde sao chamadas) podem definir os parâmetros (->atribuindo-lhes outros valores -> ou seja, os argumentos) de outras funções.
  }
  
  function formatDay(timestamp) { // 7ª e útlima função a ser efetuada, necessária para, quando pesquisamos por uma cidade no search engine, o api forecast seja exibido com base nesse dia em que efetuamos a pesquisa -> linha 81.
    let date = new Date(timestamp * 1000); // semelhante ao que fizemos na linha 10 para a date. Contudo, neste caso, apenas estamos a tratar do formato (e para um dia - não toda a data). Ou seja, dizemos que vamos receber aqui qualquer coisa (parâmetro) e o que vamos receber, deve ser exibido no formato indicado. Assim, na linha 82, apenas indicamos o que vamos receber (os dados -> dentro de response.data.daily, em cada elemento da array, day -> dentro da key/prop time), que ficará automaticamente neste formato pois é passado como parâmetro desta função. 
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day]; // ou [date.getDay()] -> sem ser necessário criar a variável day (linha 60).
  }
  
  function getForecast(city) { // 5ª função a ser realizada -> para atualizar os dados na tela com o forecast (url diferente do current). Por isso, é realizada uma nova api call
    let apiKey = "b2a5adcct04b33178913oc335f405433"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
  }
  
  function displayForecast(response) { // 6ª função a ser realizada, depois de ser efetuada a api call para o forecast (já com a cidade digitada pelo user - linha 20) -> recebe, por isso, a resposta da api com todos os dados (objecto JSON). Apenas temos de indicar quais pretendemos retirar e exibir na tela 
// console.log(response.data); // onde, inicialmente, vemos a localização dos valores que pretendemos - nome das keys que vamos usar para aceder ao valor. Este é o 1º passo que devemos efetuar quando temos uma função callback de uma API call (ou seja, que recebe uma resposta com external data).
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div> 
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" /> 
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }

/* 
Nota: JS reconhece html - por isso dizemos que é possível injectar html diretamente de JS (JS Template - correct term for this). Por isso não reconhece comments quando os tentamos fazer na parte de html, como os <div>. 
Tivemos de incluir a classe na linha 84, para que ficasse tudo na mesma coluna (cada loop). Ou seja, os dados para cada dia. 
  Isto porque estamos a usar a técnica display flex, que coloca a classe em que a aplicamos, como a linha (equivalente a "row" em Bootstrap - neste caso - a classe "weather-forecast" - html). 
  E, depois, cada elemento, dentro desta classe, funciona como uma coluna (assim, como temos vários <div> cada um ficaria numa coluna diferente). Para isso, criamos a classe "day" que representa uma coluna (dentro da classe weather-forecast, aqui selecionada através do id).
  E, colocamos todos os outros elementos, dentro desta classe. Assim, ficam todos dentro desta coluna. 
  Como são block elements, é criada uma linha antes e após cada um - portanto, ficam em linhas diferentes (dentro da mesma coluna). 
    Com excepção da img (que é inline). Mas, como está entre 2 block elements fica em linhas diferentes desses 2 <divs>.
      Neste caso, colocamos as temperaturas max e min (como span, ficando dentro na mesma linha // lado-a-lado). Mas, poderíamos tê-las colocado em div elements. E, depois, do css file, colocávamos a classe superior (forecast-temperatures) como display:flex; justify:center; -> E teria exatamente o mesmo efeito;
*/ 
  
  let searchFormElement = document.querySelector("#search-form"); // 1º passo a ser efetuado que seleciona o search engine -> onde o user irá digitar a cidade a pesquisar (linha 19 do html file)
  searchFormElement.addEventListener("submit", handleSearchSubmit); // 2º passo a ser efetuado, onde adicionamos o evento a ser efetuado após o user submeter o form com a cidade que pretende pesquisar. Este evento - handleSearchSubmit representa a 1ª função realizada no JS File (linha 50)  
  
  searchCity("Paris"); // City shown by default. Basta chamar a função searchCity -> que faz a API call e recebe os dados (a resposta) na refreshWeather, que chama automaticamente a função getForecast (para aquela cidade). Logo, apenas chamando a funçãos searchCity temos automaticamente o forecast para essa mesma cidade pesquisada (que aparece sem erros porque colocamos o nome a ser exibido na tela -> o que recebemos na api). E que também passamos para getForecast. Ainda assim, esta pesquisa é feita com base no que o user escreve e, desta forma, tem de ser um nome escrito perceptível para que a api consiga ser realizada.
  
  /*
  NOTA:
  Basicamente, os parâmetros das funções podem ter os nomes que pretendemos (apenas devemos dar um nome que seja compreensível sobre o que vamos receber ali. Tal como acontece com as variáveis. Mas o seu nome é o que quisermos - devendo apenas seguir a lógica do business-related (para ser mais compreensível) e escritas com o padrão camelCase.
  Com exceção das funções callback (api call e eventListener -> que recebem sempre uma response e um event, como argumentos).
  
  O que não é flexível - e não podemos mudar - é a forma de aceder a esses dados - que seguem padrões já estabelecidos (nome das suas keys) -> que pode alterar o formato, consoante o tipo de objeto. 
  
  E, caso seja uma api call realizada com axios, temos de colocar "response.data" (obrigatoriamente) antes de colocarmos as keys, na função callback onde recebemos essa response.
  P.e: linha 55 (como acedemos ao valor digitado pelo user no form - tem de ser obrigatoriamente dessa forma) e linha 45 (como realizamos a api call com base nessa cidade digitada pelo user, numa nova função que a recebe como parâmetro - sendo o seu nome "city" opcional - mas que demonstra o que o user está a digitar).
  */
 