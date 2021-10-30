import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCurrentWeatherByCityName, getFullWeatherByCoords } from "../api/weather";
import Alert from "../components/ALert/Alert";
import Load from "../components/Load/Load";
import Weather from "../components/Weather/Weather";
import { useData } from "../hooks/useData";

export default function City() {
  const [{ load, foundCityWeather, settings }, dispatch] = useData();
  const [cityWeather, setCityWeather] = useState(null);
  const [visible, setVisible] = useState(false);
  const { cityName } = useParams();
  useEffect(() => {
    dispatch({ type: "LOAD", payload: true });
    if (foundCityWeather) {
      (async function () {
        const [city, cityError] = await getFullWeatherByCoords({
          ...foundCityWeather.coord,
          ...settings,
        });
        if (cityError) {
          setVisible(true);
          dispatch({ type: "LOAD", payload: false });
          return;
        }
        if (city) {
          const fullCityWeather = { ...foundCityWeather, ...city };
          setCityWeather(fullCityWeather);
          dispatch({ type: "SET_FOUND_CITY_WEATHER", payload: null });
        }
        dispatch({ type: "LOAD", payload: false });
      })();
    } else if (!foundCityWeather && cityName) {
      (async function () {
        const [cityCurrent, cityCurrentError] = await getCurrentWeatherByCityName({
          q: cityName,
          ...settings,
        });
        if (cityCurrentError) {
          setVisible(true);
          dispatch({ type: "LOAD", payload: false });
          return;
        }
        const [city, cityError] = await getFullWeatherByCoords({
          ...cityCurrent.coord,
          ...settings,
        });
        if (cityError) {
          setVisible(true);
          dispatch({ type: "LOAD", payload: false });
          return;
        }
        if (city) {
          const fullCityWeather = { ...cityCurrent, ...city };
          setCityWeather(fullCityWeather);
          dispatch({ type: "SET_FOUND_CITY_WEATHER", payload: null });
        }
        dispatch({ type: "LOAD", payload: false });
      })();
    } else {
      dispatch({ type: "LOAD", payload: false });
      console.warn("Coords and cityName is not defined! Redirect to 404!");
    }
  }, [cityName, dispatch, settings, foundCityWeather]);

  return (
    <div className="cityWrapper">
      {visible && <Alert visibility={setVisible} />}
      {load && <Load />}
      {cityWeather && <Weather data={cityWeather} full />}
    </div>
  );
}
