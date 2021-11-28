let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xOluqnJZrnwhKm4XWF3GH6HI5TUjq&ipAddress=';

let mapDefault = L.map('map').setView([34.04915, -118.09462], 17);
let marker = L.marker([34.04915, -118.09462]).addTo(mapDefault);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
    minZoom: 3,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapDefault);

const trackerIp = () =>{
    const input = document.getElementById('ip-address');
    const IP = input.value;
    data(API, IP);
}

const button = document.getElementById('search-address');
button.addEventListener('click', trackerIp)

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4) {
                (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Error', url_api))
            }
        })
        xhttp.send();
    })
}

const data = async (url_api,direction_ip) => {
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

    } catch (error) {
        console.log(error);
    }
}

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