 // 1. Varible declaration
 let days = ["Sunday"," Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 let months = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
 let apiKey = "638dfae104o02t4843b3b3d0b32d7760";
 // 2. Functions declaration
 function searchCity (city){
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get (apiUrl).then (currentWeather);
 }

 function apiForecast (city){
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios.get (apiUrl).then (tempInter);
    
 }

 function tempInter (response){
    let mintE = document.querySelector("p.tmin");
    let maxtE = document.querySelector("p.tmax");
    let mint = Math.round(response.data.daily[0].temperature.minimum);
    let maxt = Math.round(response.data.daily[0].temperature.maximum);
    mintE.innerHTML = `${mint}º`;
    maxtE.innerHTML = `${maxt}º`;

 } 

 function currentWeather (response) {
  let cityE = document.querySelector("h1.current-city");  
  let city = response.data.city;
  let countryE = document.querySelector(".country");
  let country = response.data.country;
  let currentTempE = document.querySelector("#current_tempeture");
  let currentTempV = Math.round(response.data.temperature.current);
  let sensationE = document.querySelector("#sensation-temp");
  let sensation = Math.round(response.data.temperature.feels_like);
  let iconE = document.querySelector("#current-icon");
  let iconFe = document.querySelector("#current-icon2");
  let descriptionE =document.querySelector("#current-description");
  let description = response.data.condition.description;
  let windE = document.querySelector("p.wind-speed");
  let wind = Math.round(response.data.wind.speed);
  let humidityE = document.querySelector("p.humidity-data");
  let humidity = Math.round(response.data.temperature.humidity);
  let pressureE = document.querySelector("p.pressure-data");
  let pressure = Math.round(response.data.temperature.pressure);
  let date = new Date ( response.data.time*1000);
  let currentDateE = document.querySelector("p.current-date");
  let currentDateEF = document.querySelector("#current-date2");
  let currentDayE = document.querySelector("#current-day");
  let currentDayEF = document.querySelector("p.current-day");
  let timeE = document.querySelector("p.time");


  cityE.innerHTML = city;
  countryE.innerHTML = country;
  currentTempE.innerHTML = `${currentTempV}º`;
  sensationE.innerHTML = sensation;
  iconE.innerHTML = `<img src="${response.data.condition.icon_url}" id="icon-url" />`;
  iconFe.innerHTML = `<img src="${response.data.condition.icon_url}" id="current-icon2f" />`
  descriptionE.innerHTML = capital(description);
  windE.innerHTML = `${wind} km/h`;
  humidityE.innerHTML = `${humidity}%`;
  pressureE.innerHTML = `${pressure} mb`;
  currentDateE.innerHTML = `${dayDate (date)},`;
  currentDateEF.innerHTML = dayDate(date);
  currentDayE.innerHTML = todayDay (date);
  currentDayEF.innerHTML = todayDay (date);
  timeE.innerHTML = time(date);
  apiForecast(city);
 }



 function capital (description){
    return description.charAt(0).toUpperCase() + description.slice(1);
 }

 function dayDate (date){
    let today = date.getDate();
    let month = months[date.getMonth()];
    return `${month} ${today}`
    }
 function todayDay (date){
    let day = days[date.getDay()];
    return day;
 }
 function time (date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    if(hours<10){
        hours =`0${hours}`;
    }
    return `${hours}:${minutes}h`
 }

 
 function searchForm (event){
    event.preventDefault ();
    let searchInput = document.querySelector("#search-input");
    searchCity (searchInput.value);
 }
 
 
 let formInput = document.querySelector ("#search-form");
 formInput.addEventListener ("submit", searchForm);

 