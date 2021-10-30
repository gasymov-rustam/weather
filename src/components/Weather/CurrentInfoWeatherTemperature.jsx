import { useData } from "../../hooks/useData";
import { getTemperatureSymbol } from "../../utils/utils";
import styles from "./Weather.module.css";
function CurrentInfoWeatherTemperature({ data }) {
  const [{ settings }] = useData();
  return (
    <div>
      <p className={styles.generalData}>
        <span>feels</span>
        {data.main["feels_like"].toFixed(1)}
        {getTemperatureSymbol(settings.units)}
      </p>
      <p className={styles.generalData}>
        <span>min. temperature</span>
        {data.main["temp_min"].toFixed(1)}
        {getTemperatureSymbol(settings.units)}
      </p>
      <p className={styles.generalData}>
        <span>max. temperature</span>
        {data.main["temp_max"].toFixed(1)}
        {getTemperatureSymbol(settings.units)}
      </p>
    </div>
  );
}

export default CurrentInfoWeatherTemperature;
