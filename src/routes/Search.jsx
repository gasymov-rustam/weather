import { useHistory } from "react-router";
import {
  getCurrentWeatherByCityName,
  getCurrentWeatherByCoords,
  getCitiesSuggestions,
} from "../api/weather";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [querySuggetions, setQuerySuggetions] = useState([]);
  const [searchSuggests, setSearchSuggests] = useState(true);

  useEffect(() => {
    dispatch({ type: "LOAD", payload: true });
    setTimeout(() => {
      dispatch({ type: "LOAD", payload: false });
    }, 5000);
  }, [dispatch]);

  useEffect(() => {
    let timer = null;
    if (searchQuery && searchSuggests) {
      timer = setTimeout(() => {
        (async function () {
          const [suggestions, suggestionsError] = await getCitiesSuggestions(searchQuery);
          if (suggestionsError) {
            setVisible(true);
            return;
          }
          if (suggestions) {
            setQuerySuggetions(suggestions.city);
          }
        })();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [searchQuery, searchSuggests]);

  useEffect(() => {
    if (Array.isArray(coordsByMap)) {
      (async function () {
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
      })();
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

  // useEffect(() => {
  //   let timer = null;
  //   if (searchQuery) {
  //     timer = setTimeout(() => {
  //       (async function () {
  //         const [suggestions, suggestionsError] = await getCitiesSuggestions({ q: searchQuery });
  //         if (suggestions) {
  //           console.log(suggestions.city);
  //           setQuerySuggetions(suggestions.city);
  //         }
  //       })();
  //     }, 1000);
  //   }
  //   return () => clearTimeout(timer);
  //   // if (searchQuery) {
  //   //   (async function () {
  //   //     const [suggestions, suggestionsError] = await throttled(searchQuery);
  //   //     if (suggestions) {
  //   //       console.log(suggestions.city);
  //   //     }
  //   //   })();
  //   // }
  // }, [searchQuery]);

  return (
    <div>
      {visible && <Alert visibility={setVisible} coords={nocoords} setCoords={setNoCoords} />}
      <div className="formWrapper">
        <form
          onSubmit={handleSubmit}
          className="searchForm"
        >
          <div className="form__Suggestions">
            <input
              type="search"
              name="search"
              value={searchQuery}
              required
              placeholder="'Mexico' or 'London,GB'"
              // list="abd"
              className="searchInput"
              autoComplete="off"
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setSearchSuggests(true)}
              onBlur={() =>
                setTimeout(() => {
                  setSearchSuggests(false)
                }, 500)
              }
              // onFocus={()=> setSearchSuggests(true)}
            />
            <ul>
              {searchSuggests && querySuggetions.map((suggest, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setQuerySuggetions([]);
                    setSearchQuery(suggest);
                    setSearchSuggests(false);
                  }}
                >
                  {suggest}
                </li>
              ))}
            </ul>
          </div>
          {/* <datalist id="abd">{querySuggetions.map((suggest, i) => <option key={i}>{suggest}</option>)}</datalist> */}
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>
        <button type="submit" className="searchBtn" onClick={() => handlerClick()}>
          Show my Weather
        </button>
      </div>
      <MapComponent coordinates={setCoordsByMap} />
    </div>
  );
}
