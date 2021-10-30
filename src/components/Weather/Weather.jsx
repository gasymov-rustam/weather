import styles from "./Weather.module.css";
import { useData } from "../../hooks/useData";
import RoutetoFullInformation from "./RoutetoFullInformation";
import FullWeather from "./FullWeather";
import Favorite from "./Favorite";
import MainInfoWeather from "./MainInfoWeather";
import CurrentInfoWeather from "./CurrentInfoWeather";

export default function Weather({ data, full, button }) {
  const [{ settings }] = useData();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.update}>
          LAST UPDATE: <span>{`${new Date(data.dt * 1000).toLocaleTimeString()}`}</span>
        </div>
        <div className={styles.title}>
          <h2 className={styles.country}>
            {data.name}, {data.sys.country}
          </h2>
          <h2 className={styles.time}>{`${new Date().toString().slice(0, 21)}`}</h2>
        </div>
        <Favorite data={data} />
        <CurrentInfoWeather data={data} />
        <MainInfoWeather data={data} />
        {full && <FullWeather data={data} />}
        {button && <RoutetoFullInformation button={button} data={data} />}
      </div>
    </>
  );
}
