let lat;
let lon;
let locationName=document.getElementById("locationName");
let setIcon=document.getElementById("icon");
let desc=document.getElementById("description");
let temperature=document.getElementById("temp");
let minTemp= document.getElementById("minTemp");
let maxTemp=document.getElementById("maxTemp");
let windSpeed=document.getElementById("windSpeed"); 


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position =>{
        lat=position.coords.latitude;
        lon=position.coords.longitude;

        console.log(position);

        //to get the data from the api.
        let data= await getWeatherData(lat,lon);
        //for placing map in bg leaflet.js tutorial
        var map = L.map('map').setView([lat,lon], 6);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//marker used on the map when clicked
var marker = L.marker([lat,lon]).addTo(map);
//used for the pop up on the marker
marker.bindPopup(`<b>${data.name}</b>`).openPopup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }


//to change thw weather data on click
map.on('click',async  function(e){
// if the await is not used the data is set as undefined.

    const data=await getWeatherData(e.latlng.lat,e.latlng.lng);
    marker.setLatLng([e.latlng.lat,e.latlng.lng])
    marker.bindPopup(`<b>${data.name}</b>`).openPopup();
});


       
        return data;
    });
}
async function getWeatherData(lat,lon){
    //open weather map api website api 
    let api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=62d4bf78c0db587a5e9ceef83082e266`;

    let response = await fetch(api);
    let data=await response.json();

    console.log(data);

    dataHandler(data);
    return data;
}

function dataHandler(data){

    //fetched from the api  from the object in the console.
  const {temp,temp_min , temp_max} = data.main;
  const {description} = data.weather[0];
//   const {name} = data.name;
   const {speed} = data.wind;
   const {icon} =data.weather[0]

   //data fetched from api object in console .
   locationName.innerHTML =data.name;
   desc.innerHTML = description;
   temperature.innerHTML = temp;
   minTemp.innerHTML = "Min-Temp: "+ temp_min;
   maxTemp.innerHTML="Min-Temp: "+ temp_max;
   windSpeed.innerHTML ="WindSpeed: "+speed;
   setIcon.style["background"] = `url(${setIconFunction(icon)})`

}


//icon animations.....called  in  dataHandler.


function setIconFunction(icon) {
 
    const icons = {
        "01d": "./animated/day.svg",
        "02d": "./animated/cloudy-day-1.svg",
        "03d": "./animated/cloudy-day-2.svg",
        "04d": "./animated/cloudy-day-3.svg",
        "09d": "./animated/rainy-1.svg",
        "10d": "./animated/rainy-2.svg",
        "11d": "./animated/rainy-3.svg",
        "13d": "./animated/snowy-6.svg",
        "50d": "./animated/icons8-foggy-64.png",
        "01n": "./animated/night.svg",
        "02n": "./animated/cloudy-night-1.svg",
        "03n": "./animated/cloudy-night-2.svg",
        "04n": "./animated/cloudy-night-3.svg",
        "09n": "./animated/rainy-1.svg",
        "10n": "./animated/rainy-2.svg",
        "11n": "./animated/rainy-3.svg",
        "13n": "./animated/snowy-6.svg",
        "50n": "./animated/icons8-foggy-64.png"
    };
 
    return icons[icon];
}
