import { useHistory } from "react-router";
import { getCurrentWeatherByCityName } from "../api/weather";
import { useData } from "../hooks/useData";
import { useState } from "react";
import Alert from "../components/ALert/Alert";

export default function Search() {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const [, dispatch] = useData();
  async function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    const [city, cityError] = await getCurrentWeatherByCityName(searchQuery);
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
      {visible && <Alert visibility={setVisible} />}
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
    </div>
  );
}
