import { useEffect } from "react";
import { useParams } from "react-router";
import { getCurrentWeatherByCityName } from "../api/weather";
import Load from "../components/Load/Load";
import { useData } from "../hooks/useData";

export default function City() {
  const [{ coord, load }, dispatch] = useData();
  const {cityName} = useParams();
  console.log(cityName);
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
        }
      })();
    }
  }, [cityName]);
  return (
    <>
      {load && <Load/>}
      <div>
        <p>{coord.lon}</p>
        <h1>city ({cityName || "none!"})</h1>
      </div>
    </>
  );
}
