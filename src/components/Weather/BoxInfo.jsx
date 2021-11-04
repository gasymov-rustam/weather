import { useData } from "../../hooks/useData";
import { getTemperatureSymbol } from "../../utils/utils";
import styles from "./Weather.module.css";
function BoxInfo({ data, idx, array }) {
  const [{ settings }] = useData();
  return (
    <div className={styles.box}>
      <img
        src={
          typeof array[0] === "string"
            ? `http://openweathermap.org/img/wn/${data.daily[idx].weather[0].icon}@2x.png`
            : `http://openweathermap.org/img/wn/${data.hourly[array[idx]].weather[0].icon}@2x.png`
        }
        width="50"
        height="50"
        loading="lazy"
        alt="didn`t find"
        className={styles.iconBox}
      />
      {typeof array[0] === "string" && (
        <h4>{array[new Date(data.daily[idx].dt * 1000).getDay()]}</h4>
      )}
      {typeof array[0] !== "string" && (
        <h4>
          {new Date(data.hourly[array[idx]].dt * 1000).toTimeString().split(" ")[0].slice(0, 5)}
        </h4>
      )}
      <p>{data.daily[idx].weather[0].description}</p>
      <div>
        {data.daily[idx].temp.day.toFixed(1)} {getTemperatureSymbol(settings.units)}
      </div>
    </div>
  );
}

export default BoxInfo;
