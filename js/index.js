const icon = document.querySelector(".icon");
const temperature = document.querySelector(".temperature")
const description = document.querySelector(".description");
const place = document.querySelector(".place");
const notification = document.querySelector(".notification");
const details = document.querySelector(".details");
const formNotification = document.querySelector(".form-notification");

const api_key = "e5bb4db6fbf279a862f063bc7f2ea81e";

var weather = {};
weather.temperature = {
    unit: "C"
}
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} 
else{
    notification.style.display = "block";
    notification.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
}

function setPosition(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getWetherByCoordi(latitude, longitude);
}

function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p>${error.message}</p><p>Enter city name to know weather<p/>`
}

function getWetherByCoordi(latitude, longitude){
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e5bb4db6fbf279a862f063bc7f2ea81e`;
    fetch(url)
    .then(function(response){
        var data = response.json();
        return data;
    })
    .then(function(data){
        console.log(data);
        weather.temperature.value = Math.round(data.main.temp - 273);
        weather.description = data.weather[0].description;
        weather.icon = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.windSpeed = data.wind.speed;
        weather.humidity = data.main.humidity;
    })
    .then(function(){
        displayWeather()
    });
}

function displayWeather(){
    notification.style.display = "none";
    formNotification.style.display = "none";
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png"</img>`
    temperature.innerHTML = `${weather.temperature.value}<span>&#8451</span>`
    description.innerHTML = weather.description;
    details.innerHTML = `Wind Speed: ${weather.windSpeed}m/s<br>
        Humidity: ${weather.humidity}%
    `;
    place.innerHTML = weather.city+','+weather.country;
}

const cityForm = document.getElementById("city-form");
cityForm.addEventListener('submit', getWeatherByCity);
function getWeatherByCity(e){
    e.preventDefault();
    var city = document.getElementById("city").value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5bb4db6fbf279a862f063bc7f2ea81e`;
    fetch(url)
    .then(function(response){
        if (response.ok){
        var data = response.json();
        return data;
        }
        else{
            formNotification.style.display = "block";
            formNotification.innerHTML = "Enter valid city name.";
        }
    })
    .then(function(data){
        weather.temperature.value = Math.round(data.main.temp - 273);
        weather.description = data.weather[0].description;
        weather.icon = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.windSpeed = data.wind.speed;
        weather.humidity = data.main.humidity;
    })
    .then(function(){
        displayWeather()
    });

}
