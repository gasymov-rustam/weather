import styles from "./Weather.module.css";
import { useData } from "../../hooks/useData";
import { createRouteWind } from "../../utils/utils";
import { useState } from "react";
import { useHistory } from "react-router";

export default function Weather({ data, full, button, changeVisible }) {
  const history = useHistory();
  const [{ citiesId }, dispatch] = useData();
  const times = [4, 8, 12, 16, 20, 24];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let unitTemperatura = '';
  const [open, setOpen] = useState(false);
  (window.localStorage.getItem("params") ? unitTemperatura = JSON.parse(window.localStorage.getItem("params")).units : unitTemperatura = 'standart')
  // if (!window.localStorage.getItem("params")){
  //   const unitTemperatura = JSON.parse(window.localStorage.getItem("params")).units;
  // }
  // const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem("favorites")));
  // window.localStorage.setItem("favorites", JSON.stringify(favorites));
  // function handler(id) {
  //   const favoriteIdx = favorites.findIndex((item) => item === id);
  //   favoriteIdx === -1
  //     ? setFavorites((prev) => [...prev, id])
  //     : setFavorites((prev) => [...prev].filter((item) => item !== id));
  // }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.update}>
          LAST UPDATE: <span>{`${new Date(data.dt * 1000).toLocaleTimeString()}`}</span>
        </div>
        <label className={styles.favorite}>
          <input
            type="checkbox"
            name="favor"
            className={styles.favoriteCheckbox}
            checked={citiesId.includes(data.id)}
            hidden
            onChange={() => dispatch({ type: "CHANGE_CITY", payload: data.id })}
          />
          <span>&#127892;</span>
        </label>
        <div className={styles.title}>
          <h2 className={styles.country}>
            {data.name}, {data.sys.country}
          </h2>
          <h2 className={styles.time}>{`${new Date().toString().slice(0, 21)}`}</h2>
        </div>

        <p className={styles.weatherDescription}>
          {data.weather[0].main}, {data.weather[0].description}
        </p>
        <div className={styles.generalDataWrapper}>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            width="150"
            height="150"
            loading="lazy"
            alt="didn`t find"
            className={styles.icon}
          />
          <div>
            <p className={styles.generalData}>
              <span>&#127777;</span>
              {data.main.humidity} %
            </p>
            <p className={styles.generalData}>
              <span>&#127777;</span>
              {data.main.pressure} &#13169;
            </p>
            <p className={styles.generalData}>
              <span>&#128168;</span>
              {data.wind.speed} m/s
            </p>
          </div>
          <div>
            <p className={styles.generalData}>
              <span>feels</span>
              {data.main["feels_like"].toFixed(1)}
              {unitTemperatura === "standart" ? (
                <span>&#x2109;</span>
              ) : unitTemperatura === "metric" ? (
                <span>&#8451;</span>
              ) : (
                <span>&#xb0;</span>
              )}
            </p>
            <p className={styles.generalData}>
              <span>min. temperature</span>
              {data.main["temp_min"].toFixed(1)}
              {unitTemperatura === "standart" ? (
                <span>&#x2109;</span>
              ) : unitTemperatura === "metric" ? (
                <span>&#8451;</span>
              ) : (
                <span>&#xb0;</span>
              )}
            </p>
            <p className={styles.generalData}>
              <span>max. temperature</span>
              {data.main["temp_max"].toFixed(1)}
              {unitTemperatura === "standart" ? (
                <span>&#x2109;</span>
              ) : unitTemperatura === "metric" ? (
                <span>&#8451;</span>
              ) : (
                <span>&#xb0;</span>
              )}
            </p>
          </div>
          <div>
            <p className={styles.generalData}>
              <span>wind speed</span>
              {data.wind.speed}
              <span>km/h</span>
            </p>
            <div className={styles.generalData}>
              <div className={styles.generalDataArrow}>{createRouteWind(data.wind.deg)}</div>
            </div>
            <p className={styles.generalData}>
              <span>visibility</span> {data.visibility} m.
            </p>
          </div>
        </div>

        <div className={styles.containerData}>
          <div className={styles.sunrise}>
            <span>{`${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`}</span>
            <span>Sunrise</span>
          </div>

          <div className={styles.temp}>
            <span>{data.main.temp.toFixed(1).split(".")[0]},</span>
            <span>{data.main.temp.toFixed(1).split(".")[1]}</span>
            {unitTemperatura === "standart" ? (
              <span>&#x2109;</span>
            ) : unitTemperatura === "metric" ? (
              <span>&#8451;</span>
            ) : (
              <span>&#xb0;</span>
            )}
          </div>
          <div className={styles.sunset}>
            <span>{`${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`}</span>
            <span>Sunset</span>
          </div>
        </div>
        {full && (
          <>
            <h2 className={styles.title}>Hourly</h2>
            <div className={styles.hourlyWrapper}>
              {times.map((time) => (
                <div key={time} className={styles.box}>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.hourly[time].weather[0].icon}@2x.png`}
                    width="50"
                    height="50"
                    loading="lazy"
                    alt="didn`t find"
                    className={styles.icon}
                  />
                  <p>{data.hourly[time].weather[0].description}</p>
                  <div className={styles.boxTemp}>
                    {data.hourly[time].temp.toFixed(1)} <span>&#8451;</span>
                  </div>
                  <time>
                    {new Date(data.hourly[time].dt * 1000).toLocaleTimeString().slice(0, 5)} hours
                  </time>
                </div>
              ))}
            </div>
            <h2 className={styles.title}>Daily</h2>
            <div className={styles.dailyWrapper}>
              {days.map((day, idx) => (
                <div key={day} className={styles.box}>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.daily[idx].weather[0].icon}@2x.png`}
                    width="50"
                    height="50"
                    loading="lazy"
                    alt="didn`t find"
                    className={styles.icon}
                  />
                  <h4>{days[new Date(data.daily[idx].dt * 1000).getDay()]}</h4>

                  <p>{data.daily[idx].weather[0].description}</p>
                  <div className={styles.boxTemp}>
                    {data.daily[idx].temp.day.toFixed(1)} <span>&#8451;</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {button && (
          <button
            className={styles.fullWeather}
            onClick={() => history.push(`/city/${data.name},${data.sys.country}`)}
          >
            <span>more</span> ...
          </button>
        )}
        {/* {button && (
          <button
            className={styles.fullWeather}
            onClick={() => changeVisible(setOpen(!open))}
          >
            <span>more</span> ...
          </button>
        )} */}
      </div>
    </>
  );
}
