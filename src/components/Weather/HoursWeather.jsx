import BoxInfo from "./BoxInfo";
import styles from "./Weather.module.css";
const times = [4, 8, 12, 16, 20, 24];
function HoursWeather({ data }) {
  return (
    <div className={styles.hourlyWrapper}>
      {times.map((time, idx) => (
        <BoxInfo key={time} data={data} array={times} idx={idx} />
      ))}
    </div>
  );
}

export default HoursWeather;
