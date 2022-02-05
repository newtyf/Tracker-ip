// solicito la dependencia de xmlhttprequest
// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// Declaro una variable con la apu a utilizar
const API = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xOluqnJZrnwhKm4XWF3GH6HI5TUjq&ipAddress=';

// Pinto el mapa por defecto, al ingresar a la pagina
let mapDefault = L.map('map').setView([34.04915, -118.09462], 17);
let marker = L.marker([34.04915, -118.09462]).addTo(mapDefault);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
    minZoom: 3,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapDefault);

// funcion que se llamara cuando se haga click en el boton para solicitar la ubicacion
const trackerIp = () =>{
    const input = document.getElementById('ip-address');
    const IP = input.value;
    data(API, IP);
}

// variable que seleccionara el boton a usar
const button = document.getElementById('search-address');
button.addEventListener('click', trackerIp)

// funcion que inicia una peticion, verifica si la conexion esta lista y si la peticion fue recibida correctamente
// const fetchData = (url_api) => {
//     return new Promise((resolve, reject) => {
//         const xhttp = new XMLHttpRequest();
//         xhttp.open('GET', url_api, true);
//         xhttp.onreadystatechange = (() => {
//             if(xhttp.readyState === 4) {
//                 (xhttp.status === 200)
//                 ? resolve(JSON.parse(xhttp.responseText))
//                 : reject(new Error('Error', url_api))
//             }
//         })
//         xhttp.send();
//     })
// }

const fetchData = async (url) => {
    let rest = await fetch(url);
    let rest_1 = rest.json();

    return rest_1;
}

// funcion que inicia luncion de fetchData y la espera hasta que envie la repsuesta, luego procesa la informacion seleccionando las caracteristicas principales con la cual se obtendra la ubicacion
const data = async (url_api,direction_ip) => {
    // recibe los datos
    try {
        const info = await fetchData(`${url_api}${direction_ip}`);
        const ip = info.ip;
        const country = info.location.country;
        const city = info.location.city;
        const timeZone = info.location.timezone;
        const isp = info.isp;
        const latitude = info.location.lat;
        const longitud = info.location.lng;

        const pIp = document.getElementById('ip');
        pIp.innerText = `${ip}`;

        const pLocate = document.getElementById('locate');
        pLocate.innerText = `${country}, ${city}`;

        const pTimeZone = document.getElementById('timezone');
        pTimeZone.innerText = `UTC${timeZone}`

        const pIsp = document.getElementById('isp');
        pIsp.innerText = `${isp}`

        drawMap(latitude, longitud);
    // recibe el error si es que hay alguno
    } catch (error) {
        console.log(error);
    }
}

// funcion que se dedica al dibujado del mapa usando las variables que envia la funcion DATA
const drawMap = (lat, lng) => {
    var container = L.DomUtil.get('map');
        if(container != null){
        container.remove()
        const reCreateMap = document.getElementById('contain-map');
        reCreateMap.innerHTML = '<div id="map"></div>'
    }
    let mymap = L.map('map').setView([lat, lng], 17);

    let marker = L.marker([lat, lng]).addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
    minZoom: 3,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
}