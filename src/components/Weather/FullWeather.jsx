import DaysWeather from "./DaysWeather";
import HoursWeather from "./HoursWeather";
import styles from "./Weather.module.css";
function FullWeather({ data }) {
  return (
    <>
      <h2 className={styles.title}>Hourly</h2>
      <HoursWeather data={data} />
      <h2 className={styles.title}>Daily</h2>
      <DaysWeather data={data}/>
    </>
  );
}

export default FullWeather;
