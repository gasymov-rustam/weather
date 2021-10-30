import { useMemo, useContext, useEffect, useReducer, createContext } from "react";

const initialState = {
  load: false,
  citiesId: JSON.parse(window.localStorage.getItem("citiesId") || "[]"),
  foundCityWeather: null,
  settings: JSON.parse(
    window.localStorage.getItem("settings") ||
      `{
        "lang": "en",
        "units": "standart"
      }`
  ),
  // settings: JSON.parse(`{ lang: ${window.navigator.language.split("-")[0]}, utils: 'metric' }`),
};

const DataContext = createContext(initialState);
export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoValue = useMemo(() => [state, dispatch], [state]);
  useEffect(() => {
    const lang = window.navigator.language.split("-")[1];
    const units = (lang === 'en' ? "standart": "metric")
    dispatch({ type: "CHANGE_SETTINGS", payload: { units, lang } });
  }, []);
  return <DataContext.Provider value={memoValue}>{children}</DataContext.Provider>;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case "CHANGE_SETTINGS": {
      window.localStorage.setItem("settings", JSON.stringify({ ...state.settings, ...payload }));
      return { ...state, settings: { ...state.settings, ...payload } };
    }
    case "LOAD": {
      return { ...state, load: payload };
    }
    case "SET_FOUND_CITY_WEATHER": {
      return { ...state, foundCityWeather: payload };
    }
    case "CHANGE_CITY": {
      const { citiesId } = state;
      const newState = [...citiesId];
      const cityIdx = newState.findIndex((id) => id === payload);
      cityIdx === -1 ? newState.push(payload) : newState.splice(cityIdx, 1);
      window.localStorage.setItem("citiesId", JSON.stringify(newState));
      return { ...state, citiesId: newState };
    }
    default:
      throw new Error(`Unknown type =>>>> ${type}`);
  }
}
