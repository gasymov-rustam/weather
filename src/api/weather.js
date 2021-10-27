import axios from "axios";
const API_KEY = "a502141cd6f97ff96bb68d7c77410302";
const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    "content-type": "application/json;charset=utf-8",
  },

  params: {
    appid: API_KEY,
    // units: 'metric',
    // lang: 'ru',
  },
});

api.interceptors.response.use(
  (res) => [res.data, null],
  (err) => [null, err]
);

export function getCurrentWeatherByCityName(cityName, settings) {
  // let str = '';
  // console.log(settings);
  // Object.keys(settings).map(key => str+=`&${key}=${settings[key]}`)
  return api.get(`/weather?q=${cityName}${settings}`);
}
export function getCurrentWeatherByCityId(cityId, settings) {
  return api.get(`/weather?id=${cityId}${settings}`);
}
export function getCurrentWeatherByCoords(coords, settings) {
  return api.get(`/weather?lat=${coords.lat}&lon=${coords.lon}${settings}`);
}
export function getFullWeatherByCoords(coords, settings) {
  return api.get(`/onecall?lat=${coords.lat}&lon=${coords.lon}${settings}`);
}
