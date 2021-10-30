import { useData } from "../../hooks/useData";
import { getTemperatureSymbol } from "../../utils/utils";
import styles from "./Weather.module.css";
function BoxInfo({ data, idx, array }) {
  const [{ settings }] = useData();
  return (
    <div className={styles.box}>
      <img
        src={`http://openweathermap.org/img/wn/${data.daily[idx].weather[0].icon}@2x.png`}
        width="50"
        height="50"
        loading="lazy"
        alt="didn`t find"
        className={styles.iconBox}
      />
      <h4>{array[new Date(data.daily[idx].dt * 1000).getDay()]}</h4>
      <p>{data.daily[idx].weather[0].description}</p>
      <div>
        {data.daily[idx].temp.day.toFixed(1)} {getTemperatureSymbol(settings.units)}
      </div>
    </div>
  );
}

export default BoxInfo;
