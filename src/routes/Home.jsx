import { getCurrentWeatherByCityId } from "../api/weather";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import Load from "../components/Load/Load";
import Weather from "../components/Weather/Weather";

export default function Home() {
  const [{ citiesId, load, settings }, dispatch] = useData();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    dispatch({ type: "LOAD", payload: true });
    if (citiesId.length > 0) {
      (async function () {
        const response = await Promise.all(
          citiesId.map((id) => getCurrentWeatherByCityId({ id, ...settings }))
        );
        const citiesWeather = response
          .map((item) => {
            const [cityWeather, cityWeatherError] = item;
            if (!cityWeatherError) return cityWeather;
          })
          .filter(Boolean);
        setCities(citiesWeather);
        dispatch({ type: "LOAD", payload: false });
      })();
    }
  }, [citiesId, dispatch, settings]);
  return (
    <div className="favoritesWrapper">
      {load && <Load />}
      {cities.length > 0 ? (
        cities.map((item) => <Weather key={item.id} data={item} button />)
      ) : (
        <h2 className="homeTitle">Not found favorites cities</h2>
      )}
    </div>
  );
}
