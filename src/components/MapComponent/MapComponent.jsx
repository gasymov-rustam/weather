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
  const [choosenPosition, setChoosenPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const appKeyYandexMap = "a64e6649-3a05-4a97-b86f-49d4aaffcd23";

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`http://ipwhois.app/json/`);
        if (response.ok) {
          const data = await response.json();
          setCurrentPosition([data.latitude, data.longitude]);
        } else {
          throw new Error(`Unknown command ${response.status}`);
        }
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);
  // useEffect(() => {
  // const appKeyIpStack = "bebaad6271fd027ce04b4d4eac9402a0";
  //   (async function () {
  //     try {
  //       const response = await fetch(`http://api.ipstack.com/check?access_key=${appKeyIpStack}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setCurrentPosition([data.latitude, data.longitude]);
  //       } else {
  //         throw new Error(`Unknown command ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    dispatch({ type: "LOAD", payload: true });
    setTimeout(() => {
      dispatch({ type: "LOAD", payload: false });
    }, 5000);
  }, [dispatch]);

  function handlClick(e) {
    setOpen(true);
    setChoosenPosition(e.get("coords"));
  }

  useEffect(() => {
    if (showWeather) {
      coordinates(choosenPosition);
    }
  }, [showWeather, coordinates, choosenPosition]);
  // https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/geocoding/searchControl.html
  // https://yandex.ru/dev/maps/jsbox/2.1/placemark/
  return (
    <>
      {open && <Choose open={setOpen} show={setShowWeather} />}
      {/* {console.log(typeof currentPosition[0] === "undefined")} */}
      <YMaps query={{ apikey: appKeyYandexMap }}>
        <div className={styles.wrapper}>
          {load && <Load />}
          <Map
            defaultState={{
              center:
                // !currentPosition ? currentPosition : [48.4593, 35.0387],
                currentPosition || [48.4593, 35.0387],
              zoom: 11,
            }}
            className={styles.map}
            onLoad={() => dispatch({ type: "LOAD", payload: false })}
            onClick={(e) => handlClick(e)}
          >
            <Placemark geometry={choosenPosition || currentPosition} />
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
