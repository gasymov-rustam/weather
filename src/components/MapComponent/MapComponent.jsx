import { useEffect, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
  TypeSelector,
  SearchControl,
} from "react-yandex-maps";
import styles from "./MapComponent.module.css";
import Load from "../Load/Load";
import Choose from "./Choose";
import { useData } from "../../hooks/useData";

export default function MapComponent({ coordinates }) {
  const [{ load }, dispatch] = useData();
  const [open, setOpen] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const appKey = "a64e6649-3a05-4a97-b86f-49d4aaffcd23";
  useEffect(() => {
    dispatch({ type: "LOAD", payload: true });
    // setTimeout(() => {
    //   dispatch({ type: "LOAD", payload: false });
    // }, 5000);
  }, [dispatch]);

  function handlClick(e) {
    setOpen(true);
    setCurrentPosition(e.get("coords"));
  }

  useEffect(() => {
    if (showWeather) {
      coordinates(currentPosition);
    }
  }, [showWeather, coordinates, currentPosition]);
  // https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/geocoding/searchControl.html
  // https://yandex.ru/dev/maps/jsbox/2.1/placemark/
  return (
    <>
      {open && <Choose open={setOpen} show={setShowWeather} />}
      {load && <Load />}
      <YMaps query={{ apikey: appKey }}>
        <div className={styles.wrapper}>
          <Map
            defaultState={{ center: [50.450001, 30.523333], zoom: 11 }}
            className={styles.map}
            onLoad={() => dispatch({ type: "LOAD", payload: false })}
            onClick={(e) => handlClick(e)}
          >
            <Placemark geometry={currentPosition} />
            <ZoomControl options={{ float: "left" }} />
            <GeolocationControl options={{ float: "right" }} />
            <SearchControl options={{ placeholderContent: "enter city", kind: "locality" }} />
            <TypeSelector />
          </Map>
        </div>
      </YMaps>
    </>
  );
}
