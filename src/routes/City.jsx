import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCurrentWeatherByCityName, getFullWeatherByCoords } from "../api/weather";
import Alert from "../components/ALert/Alert";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import FullWeather from "../components/FullWeather/FullWeather";
import Load from "../components/Load/Load";
import { useData } from "../hooks/useData";

export default function City() {
  const [{ load, foundCityWeather }, dispatch] = useData();
  const { cityName } = useParams();
  const [cityWeather, setCityWeather] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (foundCityWeather) {
      console.log("get city by search");
      (async function () {
        const [city, cityError] = await getFullWeatherByCoords(foundCityWeather.coord);
        if (cityError) {
          setVisible(true)
          return;
        }
        if (city) {
          const fullCityWeather = { ...foundCityWeather, ...city };
          console.log(foundCityWeather, city, fullCityWeather);
          setCityWeather(fullCityWeather);
          dispatch({ type: "SET_FOUND_CITY_WEATHER", payload: null });
        }
      })();
    } else if (!foundCityWeather && cityName) {
      (async function () {
        const [cityCurrent, cityCurrentError] = await getCurrentWeatherByCityName(cityName);
        if (cityCurrentError) {
          setVisible(true)
          return;
        }
        const [city, cityError] = await getFullWeatherByCoords(cityCurrent.coord);
        if (cityError) {
          alert("Error get weather by server!");
          return;
        }
        if (city) {
          const fullCityWeather = { ...cityCurrent, ...city };
          setCityWeather(fullCityWeather);
          dispatch({ type: "SET_FOUND_CITY_WEATHER", payload: null });
        }
      })();
    } else {
      console.warn("Coords and cityName is not defined! Redirect to 404!");
    }
  }, [cityName]);

  return (
    <>
      {visible && <Alert visibility={setVisible} />}
      {load && <Load />}
      <div className="cityWrapper">
        {cityWeather && <CurrentWeather data={cityWeather} />}
        {cityWeather && <FullWeather data={cityWeather} />}
      </div>
    </>
  );
}
