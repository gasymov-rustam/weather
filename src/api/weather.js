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

export function getCurrentWeatherByCityName(params) {
  return api.get(`/weather`, {params});
}
export function getCurrentWeatherByCityId(params) {
  return api.get(`/weather`, {params});
}
export function getCurrentWeatherByCoords(params) {
  return api.get(`/weather`, {params});
}
export function getFullWeatherByCoords(params) {
  return api.get(`/onecall`, {params});
}
