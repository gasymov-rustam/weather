import styles from "./CurrentWeather.module.css";
import { useData } from "../../hooks/useData";
export default function CurrentWeather({ data }) {
  const [{citiesId},dispatch] = useData();
  return (
    <>
      <div className={styles.wrapper}>
        <label className={styles.favorite}>
          <input type="checkbox" name="favor" className={styles.favoriteCheckbox} checked={citiesId.includes(data.id)} hidden onChange={()=>dispatch({type: "CHANGE_CITY", payload: data.id})}/>
          <span>&#127892;</span>
        </label>
        <h2 className={styles.title}>
          {data.name}, {data.sys.country}
        </h2>
        <h2 className={styles.time}>{`${new Date().toString().slice(0, 21)}`}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          width="150"
          height="150"
          loading="lazy"
          alt="didn`t find"
          className={styles.icon}
        />
        <p className={styles.weatherDescription}>{data.weather[0].description}</p>
        <div className={styles.generalDataWrapper}>
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

        <div className={styles.containerData}>
          <div className={styles.sunrise}>
            <span>{`${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`}</span>
            <span>Sunrise</span>
          </div>

          <div className={styles.temp}>
            <span>{data.main.temp.toFixed(1).split(".")[0]},</span>
            <span>{data.main.temp.toFixed(1).split(".")[1]}</span>
            <span>&#8451;</span>
          </div>
          <div className={styles.sunset}>
            <span>{`${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`}</span>
            <span>Sunset</span>
          </div>
        </div>
        <div className={styles.update}>
          LAST UPDATE: <span>{`${new Date(data.dt * 1000).toLocaleTimeString()}`}</span>
        </div>
      </div>
    </>
  );
}
