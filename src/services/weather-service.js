import axios from "axios";

export const weatherService = {
    getLocationByName,
    getLocationByGeoCoords,
    getCurrentWeather,
    getFiveDaysWeather
};

const API_KEY = 'g74onLWLq4UVuuojVkuMZqnqwGiqbjin'
const DEFAULT_LOCATION_KEY = '215854' //TEL-AVIV  
const BASE_URL = `https://dataservice.accuweather.com/`

function getLocationByName(cityName){
    if (!cityName) cityName = 'tel aviv'
    const url = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityName}&language=en-us`
    return axios.get(url).then(res => res.data[0]);
}

function getLocationByGeoCoords(pos){
    const url = `${BASE_URL}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${pos.lat}%2C${pos.long}&language=en-us&details=false&toplevel=true`
    return axios.get(url).then(res => res.data)
}

function getCurrentWeather(locationKey){
    if (!locationKey) {locationKey = DEFAULT_LOCATION_KEY}
    const url = `${BASE_URL}currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en-us&details=false`
    return axios.get(url).then(res => res.data[0])
}


function getFiveDaysWeather(locationKey, isCelcius){
    if (!locationKey) {locationKey = DEFAULT_LOCATION_KEY}
    const url = `${BASE_URL}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&language=en-us&details=false&metric=${isCelcius}`
    return axios.get(url).then(res => res.data.DailyForecasts);
}

