let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xOluqnJZrnwhKm4XWF3GH6HI5TUjq&ipAddress=';

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

        const pIp = document.getElementById('ip');
        pIp.innerText = `${ip}`;

        const pLocate = document.getElementById('locate');
        pLocate.innerText = `${country}, ${city}`;

        const pTimeZone = document.getElementById('timezone');
        pTimeZone.innerText = `${timeZone}`

        const pIsp = document.getElementById('isp');
        pIsp.innerText = `${isp}`

    } catch (error) {
        console.log(error);
    }
}