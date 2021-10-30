import { useHistory } from "react-router";
import { getCurrentWeatherByCityName, getCurrentWeatherByCoords } from "../api/weather";
import { useData } from "../hooks/useData";
import { useState} from "react";
import Alert from "../components/ALert/Alert";

export default function Search() {
  const [visible, setVisible] = useState(false);
  const [nocoords, setNoCoords] = useState(false);
  const history = useHistory();
  const [{ settings }, dispatch] = useData();

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
          history.push(`/city/${getWeatherPos.name},${getWeatherPos.sys.country}`)
        }
      },
      (error) => {
        if (error){
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
  console.log(window.navigator);
  console.log(typeof window.navigator.language.split("-")[0]);
  return (
    <div className="formWrapper">
      {visible && <Alert visibility={setVisible} coords={nocoords} setCoords={setNoCoords}/>}
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
  );
}
