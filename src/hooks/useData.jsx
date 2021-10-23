import { useMemo, useContext, useEffect, useReducer, createContext } from "react";

const initialState = {
  load: false,
  fullWeather: {},
  currentWeather: {},
  citiesWeather: [],
  citiesId: [],
};
const DataContext = createContext(initialState);
export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoValue = useMemo(() => [state, dispatch], [state]);
  useEffect(() => {
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
    case "SET_COORD": {
      return { ...state, coords: payload };
    }
    case "INIT": {
      return { ...state, citiesId: payload };
    }
    case "LOAD": {
      return { ...state, load: payload };
    }
    case "CURRENT_WEATHER": {
      return { ...state, currentWeather: payload };
    }
    case "CURRENT_WEATHER_CITIES": {
      return { ...state, citiesWeather: payload };
    }
    case "FULL_WEATHER": {
      return { ...state, fullWeather: payload };
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
