 // 1. Varible declaration
 let days = ["Sunday"," Monday","Tuesday","Wednes","Thursday","Friday","Saturday"];
 let months = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
 let apiKey = "638dfae104o02t4843b3b3d0b32d7760";
 let probability;
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
    displayForecast(response.data);
    let day = new Date();
    let today = day.getDay();
    let mintE = document.querySelector("p.tmin");
    let maxtE = document.querySelector("p.tmax");
    let mint = Math.round(response.data.daily[today].temperature.minimum);
    let maxt = Math.round(response.data.daily[today].temperature.maximum);
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
  probability = rainproba(pressure, humidity);
  let message = rainMessage(probability);
  let rainE = document.querySelector("p.rain");
  rainE.textContent = message;
 }

 function displayForecast (response){
   
   let forecast = document.querySelector ("#forecast-container");
   let forecastHTML = "";

   response.daily.forEach(function (day, index)  {
  
      if(index>0 && index<6)
     {forecastHTML = forecastHTML + `<div class="forecast-day-container">
                <div class="forecast-day">
                  <div class="forecast-day-date">${fcDate(day.time)}</div>
                  <p class="forecast-week-day">${fcDay(day.time)}</p>
                </div>
                <div class="forecast-interval">
                  <p class="forecast-maxt">${Math.round(day.temperature.maximum)}º</p>
                  <p class="forecast-mint">${Math.round(day.temperature.minimum)}º</p>
                </div>
                <div class="forecast-day-icon">
                  <div class="day-icon"><img id="fday-icon" src="${day.condition.icon_url}" /></div>
                </div>
              </div>`}
     
   });

   forecast.innerHTML = forecastHTML;

}

function rainproba(pressure, humidity) {

    if (pressure > 1020) {
        if (humidity < 50) {
            probability = 10;
        } else if (humidity > 80) {
            probability = 20;
        } else {
            probability = 15;
        }
    } else if (pressure > 1010) {
        if (humidity < 50) {
            probability = 20;
        } else if (humidity > 80) {
            probability = 50;
        } else {
            probability = 35;
        }
    } else if (pressure > 1000) {
        if (humidity < 50) {
            probability = 50;
        } else if (humidity > 80) {
            probability = 80;
        } else {
            probability = 65;
        }
    } else {
        if (humidity < 50) {
            probability = 70;
        } else if (humidity > 80) {
            probability = 100;
        } else {
            probability = 85;
        }
    }

    return probability;
}


function rainMessage(probability) {
      
    if (probability <= 10) {
        return "Very low chance of precipitation";
    } else if (probability <= 30) {
        return "Low chance of precipitation";
    } else if (probability <= 50) {
        return "Moderate chance of precipitation";
    } else if (probability <= 70) {
        return "High chance of precipitation";
    } else {
        return "Very high chance of precipitation";
    }
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
 function fcDay (timef){
   let date = new Date(timef*1000);
   return days [date.getDay()];
 }
 function fcDate (timef) {
   let date = new Date(timef*1000);
   return `${months[date.getMonth()]} ${date.getDate()}`;

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

 
 
searchCity("Porto");

 
