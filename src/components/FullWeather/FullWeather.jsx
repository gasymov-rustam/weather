import styles from "./FullWeather.module.css";

export default function FullWeather({ data }) {
  const times = [4, 8, 12, 16, 20, 24];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <>
      <h2 className={styles.title}>Hourly</h2>
      <div className={styles.hourlyWrapper}>
        {times.map((time) => (
          <div key={time} className={styles.box}>
            <img
              src={`http://openweathermap.org/img/wn/${data.hourly[time].weather[0].icon}@2x.png`}
              width="50"
              height="50"
              loading="lazy"
              alt="didn`t find"
              className={styles.icon}
            />
            <p>{data.hourly[time].weather[0].description}</p>
            <div className={styles.temp}>
              {data.hourly[time].temp.toFixed(1)} <span>&#8451;</span>
            </div>
            <time>
              {new Date(data.hourly[time].dt * 1000).toLocaleTimeString().slice(0, 5)} hours
            </time>
          </div>
        ))}
      </div>
      <h2 className={styles.title}>Daily</h2>
      <div className={styles.dailyWrapper}>
        {days.map((day, idx) => (
          <div key={day} className={styles.box}>
            <img
              src={`http://openweathermap.org/img/wn/${data.daily[idx].weather[0].icon}@2x.png`}
              width="50"
              height="50"
              loading="lazy"
              alt="didn`t find"
              className={styles.icon}
            />
            <time>{days[new Date(data.daily[idx].dt * 1000).getDay()]}</time>

            <p>{data.daily[idx].weather[0].description}</p>
            <div className={styles.temp}>
              {data.daily[idx].temp.day.toFixed(1)} <span>&#8451;</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
