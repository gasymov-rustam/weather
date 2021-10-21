import axios from 'axios';
const API_KEY = 'a502141cd6f97ff96bb68d7c77410302';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
  params: {
    appid: API_KEY,
  },
});

api.interceptors.response.use(
  (res) => [res.data, null],
  (err) => [null, err]
);

export function getCurrentWeatherByCityName(cityName) {
  return api.get(`/weather?q=${cityName}`);
}
export function getCurrentWeatherByCityId(cityId) {
  return api.get(`/weather?id=${cityId}`);
}
export function getCurrentWeatherByCoords(coords) {
  return api.get(`/weather?lat=${coords.lat}&lon=${coords.lon}`);
}
export function getFullWeatherByCoords(coords) {
  return api.get(`/onecall?lat=${coords.lat}&lon=${coords.lon}`);
}
