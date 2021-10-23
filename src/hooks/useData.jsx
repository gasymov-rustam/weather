import { useMemo, useContext, useEffect, useReducer, createContext } from "react";

const initialState = {
  coord: {
    lat: null,
    lon: null,
  },
  load: false,
};
const DataContext = createContext(initialState);
export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoValue = useMemo(() => [state, dispatch], [state]);
  return <DataContext.Provider value={memoValue}>{children}</DataContext.Provider>;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_COORD": {
      return { ...state, coord: payload };
    }
    case "LOAD": {
      return { ...state, load: payload };
    }
    default:
      throw new Error(`Unknown type =>>>> ${type}`);
  }
}
