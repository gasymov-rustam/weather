import styles from "./Weather.module.css";
function CurrentInfoWeatherGeneral({ data }) {
  
  return (
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
  );
}

export default CurrentInfoWeatherGeneral;
