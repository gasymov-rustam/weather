import { useHistory } from "react-router";
import { getCurrentWeatherByCityName, getCurrentWeatherByCoords } from "../api/weather";
import { useData } from "../hooks/useData";
import { useState, useEffect } from "react";
import Alert from "../components/ALert/Alert";
import MapComponent from "../components/MapComponent/MapComponent";

export default function Search() {
  const [visible, setVisible] = useState(false);
  const [nocoords, setNoCoords] = useState(false);
  const history = useHistory();
  const [{ settings }, dispatch] = useData();
  const [coordsByMap, setCoordsByMap] = useState(null);
  

  useEffect(() => {
    if(Array.isArray(coordsByMap)){
      (async function(){
        const [getWeatherPos, getWeatherPosError] = await getCurrentWeatherByCoords({
          lat: coordsByMap[0],
          lon: coordsByMap[1],
          ...settings,
        });
        if (getWeatherPosError) {
          setVisible(true);
          return;
        }
        if (getWeatherPos) {
          history.push(`/city/${getWeatherPos.name},${getWeatherPos.sys.country}`);
        }
      })()
    }
  }, [coordsByMap, history, settings]);

  async function handlerClick() {
    setNoCoords(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const [getWeatherPos, getWeatherPosError] = await getCurrentWeatherByCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          ...settings,
        });
        if (getWeatherPosError) {
          setVisible(true);
          return;
        }
        if (getWeatherPos) {
          history.push(`/city/${getWeatherPos.name},${getWeatherPos.sys.country}`);
        }
      },
      (error) => {
        if (error) {
          setVisible(true);
          setNoCoords(true);
          return;
        }
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    const [city, cityError] = await getCurrentWeatherByCityName({ q: searchQuery, ...settings });
    if (cityError) {
      setVisible(true);
      e.target.search.value = "";
      return;
    }
    if (!cityError) {
      dispatch({ type: "SET_FOUND_CITY_WEATHER", payload: city });
      history.push(`/city/${city.name},${city.sys.country}`);
    }
  }
  return (
    <div>
      {visible && <Alert visibility={setVisible} coords={nocoords} setCoords={setNoCoords} />}
      <div className="formWrapper shadow">
        <form onSubmit={handleSubmit} className="searchForm">
          <input
            type="search"
            name="search"
            required
            placeholder="'Mexico' or 'London,GB'"
            className="searchInput"
          />
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>
        <button type="submit" className="searchBtn" onClick={() => handlerClick()}>
          Show my Weather
        </button>
      </div>
      <MapComponent coordinates={setCoordsByMap} position={coordsByMap}/>
    </div>
  );
}
