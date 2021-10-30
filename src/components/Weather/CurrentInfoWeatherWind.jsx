import { createRouteWind } from "../../utils/utils"
import styles from "./Weather.module.css";

function CurrentInfoWeatherWind({data}) {
  return (
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
  )
}

export default CurrentInfoWeatherWind
