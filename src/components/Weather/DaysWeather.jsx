import BoxInfo from "./BoxInfo";
import styles from "./Weather.module.css";
function DaysWeather({ data }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <div className={styles.hourlyWrapper}>
      {days.map((day, idx) => (
        <BoxInfo key={day} data={data} array={days} idx={idx} />
      ))}
    </div>
  );
}

export default DaysWeather;
