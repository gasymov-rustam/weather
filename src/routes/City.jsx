import { useEffect } from "react";
import { useParams } from "react-router";
import { getCurrentWeatherByCityName, getFullWeatherByCoords } from "../api/weather";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Load from "../components/Load/Load";
import { useData } from "../hooks/useData";

export default function City() {
  const [{ coords, load, fullWeather, currentWeather }, dispatch] = useData();
  const { cityName } = useParams();
  useEffect(() => {
    if (cityName) {
      (async function () {
        dispatch({ type: "LOAD", payload: true });
        const [city, cityError] = await getCurrentWeatherByCityName(cityName);
        if (cityError) {
          alert("City not found!");
          return;
        }
        if (city) {
          dispatch({ type: "LOAD", payload: false });
          dispatch({ type: "SET_COORD", payload: { lat: city.coord.lat, lon: city.coord.lon } });
          dispatch({ type: "CURRENT_WEATHER", payload: city });
        }
      })();
    }
  }, [cityName]);
  useEffect(() => {
    if (currentWeather.coord) {
      (async function () {
        dispatch({ type: "LOAD", payload: true });
        const [city, cityError] = await getFullWeatherByCoords(currentWeather.coord);
        if (cityError) {
          alert("City not found!");
          return;
        }
        if (city) {
          dispatch({ type: "LOAD", payload: false });
          dispatch({ type: "FULL_WEATHER", payload: city });
        }
      })();
    }
  }, [currentWeather.coord]);
  return (
    <>
      {load && <Load />}
      {Object.keys(currentWeather).length > 0 && <CurrentWeather data={currentWeather}/>}
      {Object.keys(currentWeather).length > 0 && <CurrentWeather data={currentWeather}/>}
      <div>
        {/* <p>{coords.lon}</p> */}
        {/* <p>{coords.lat}</p> */}
        {/* <h1>city ({cityName || "none!"})</h1> */}
        {/* https://api.openweathermap.org/data/2.5/onecall?lat={'50.4333'}&lon={'30.5167'}&exclude={part}&appid={'a502141cd6f97ff96bb68d7c77410302'}*/}
        {/* {https://api.openweathermap.org/data/2.5//weather?q=Kiev&appid=a502141cd6f97ff96bb68d7c77410302} */}
        {/* {https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&lang=ru&appid=a502141cd6f97ff96bb68d7c77410302} */}
        {/* <CityCard data={a} /> */}
        {/* {console.log(currentWeather.coord)} */}
      </div>
    </>
  );
}
