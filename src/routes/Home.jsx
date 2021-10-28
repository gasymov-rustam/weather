import { getCurrentWeatherByCityId } from "../api/weather";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import Load from "../components/Load/Load";
import Weather from "../components/Weather/Weather";

export default function Home() {
  const [{ citiesId, load, settingsParams }, dispatch] = useData();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        setCities([])
        const response = await Promise.all(citiesId.map((id) => getCurrentWeatherByCityId(id, settingsParams)));
        response.forEach((item) => {
          const [getCity, getCityError] = item;
          if (!getCityError) setCities((prev) => [...prev, getCity]);
        });
      } catch (error) {
        console.warn(error);
      }
    })();
  }, [citiesId, dispatch]);
  return (
    <div>
      {load && <Load />}

      {cities.length !== 0 ? (
        cities.map((item) => <Weather key={item.id} data={item} full={false} button={true}/>)
      ) : (
        <h2 className="homeTitle">Not found favorites cities</h2>
      )}
    </div>
  );
}

  // useEffect(() => {
  //  (async function(){
  //    try {
  //      const response = await Promise.all(favorites.map( id => getCurrentWeatherByCityId(id)))
  //      response.forEach(item => {
  //        const [getCity, getCityError] = item;
  //        if(!getCityError) setCities((prev)=> [...prev, getCity])
  //        console.log(cities);
  //      })
  //    } catch (error) {
  //      console.warn(error);
  //    }
  //  })()

  // }, []);
  // useEffect(() => {
  //   let cities = [];
  //   citiesId.forEach((id) => {
  //     (async function () {
  //       dispatch({ type: "LOAD", payload: true });
  //       if (id) {
  //         const [city, cityError] = await getCurrentWeatherByCityId(id);
  //         if (!cityError) {
  //           cities.push(city);
  //           dispatch({ type: "CURRENT_WEATHER_CITIES", payload: cities });
  //           dispatch({ type: "LOAD", payload: false });
  //         }
  //       }
  //     })();
  //   });
  // }, [citiesId, dispatch]);
// const [favorites, setFavorites] = useState([]);
  // useEffect(() => {
  //   setFavorites(() => JSON.parse(window.localStorage.getItem("favorites")))
  //   console.log(favorites);
  // }, [])
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       // setCities([])
  //       // setFavorites([])
  //       setFavorites(JSON.parse(window.localStorage.getItem("favorites")))
  //       const response = await Promise.all(favorites.map((id) => getCurrentWeatherByCityId(id)));
  //       response.forEach((item) => {
  //         const [getCity, getCityError] = item;
  //         if (!getCityError) setCities((prev) => [...prev, getCity]);
  //         console.log(cities);
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   })();
  //   console.log(favorites);
  // }, []);