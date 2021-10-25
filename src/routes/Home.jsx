import { getCurrentWeatherByCityId } from "../api/weather";
import { useData } from "../hooks/useData";
import { useEffect } from "react";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Load from "../components/Load/Load";

export default function Home() {
  const [{ citiesId, citiesWeather, load }, dispatch] = useData();
  useEffect(() => {
    let cities = [];
    citiesId.forEach((id) => {
      (async function () {
        dispatch({ type: "LOAD", payload: true });
        if (id) {
          const [city, cityError] = await getCurrentWeatherByCityId(id);
          if (!cityError) {
            cities.push(city);
            dispatch({ type: "CURRENT_WEATHER_CITIES", payload: cities });
            dispatch({ type: "LOAD", payload: false });
          }
        }
      })();
    });
  }, [citiesId, dispatch]);
  return (
    <div>
      {load && <Load />}
      {citiesId.length !== 0 ? (
        citiesWeather.map((item) => <CurrentWeather key={item.id} data={item} />)
      ) : (
        <h2 className="homeTitle">Not found favorites cities</h2>
      )}
    </div>
  );
}
