import { useData } from "../../hooks/useData";
import { getTemperatureSymbol } from "../../utils/utils";
import styles from "./Weather.module.css";
function MainInfoWeather({data}) {
  const [{settings}] = useData()
  return (
    <div className={styles.containerData}>
      <div className={styles.sunrise}>
        <span>{`${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`}</span>
        <span>Sunrise</span>
      </div>

      <div className={styles.temp}>
        <span>{data.main.temp.toFixed(1).split(".")[0]},</span>
        <span>{data.main.temp.toFixed(1).split(".")[1]}</span>
        {getTemperatureSymbol(settings.units)}
      </div>
      <div className={styles.sunset}>
        <span>{`${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`}</span>
        <span>Sunset</span>
      </div>
    </div>
  );
}

export default MainInfoWeather;
