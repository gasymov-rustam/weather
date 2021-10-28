import { useMemo, useContext, useEffect, useReducer, createContext } from "react";

const initialState = {
  load: false,
  citiesId: [],
  foundCityWeather: null,
  settingsParams: ``,
};
const DataContext = createContext(initialState);
export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoValue = useMemo(() => [state, dispatch], [state]);
  useEffect(() => {
    if (!window.localStorage.getItem("params")) 
      window.localStorage.setItem(
        "params",
        JSON.stringify({
          lang: "hebrew",
          units: "standart",
        })
      );
      if (!window.localStorage.getItem("citiesId"))
      window.localStorage.setItem("citiesId", JSON.stringify([]));
    dispatch({
      type: "INIT",
      payload: JSON.parse(window.localStorage.getItem("citiesId")),
    });
  }, []);
  return <DataContext.Provider value={memoValue}>{children}</DataContext.Provider>;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case "INIT": {
      return { ...state, citiesId: payload };
    }
    case "CHANGE_SETTINGS": {
      return { ...state, settingsParams: payload };
    }
    case "LOAD": {
      return { ...state, load: payload };
    }
    case "SET_FOUND_CITY_WEATHER": {
      return { ...state, foundCityWeather: payload };
    }
    case "CHANGE_CITY": {
      const { citiesId } = state;
      let newState = [...citiesId];
      let cityId = newState.findIndex((id) => id === payload);
      cityId === -1 ? newState.push(payload) : newState.splice(cityId, 1);
      window.localStorage.setItem("citiesId", JSON.stringify(newState));
      return { ...state, citiesId: newState };
    }
    default:
      throw new Error(`Unknown type =>>>> ${type}`);
  }
}
