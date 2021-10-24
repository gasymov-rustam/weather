import styles from "./FullWeather.module.css";

export default function FullWeather({ data }) {
  const time = [0, 4, 8, 12, 16, 20];
  const days = ['monday', 'tuesday']
  return (
    <>
      <hr />
      <h2 className={styles.title}>Hourly</h2>
      <div className={styles.hourlyWrapper}>
        {time.map((t) => (
          <div key={t} className={styles.box}>
            <img
              src={`http://openweathermap.org/img/wn/${data.hourly[t].weather[0].icon}@2x.png`}
              width="50"
              height="50"
              loading="lazy"
              alt="didn`t find"
              className={styles.icon}
            />
            <p>{data.hourly[t].weather[0].description}</p>
            <div className={styles.temp}>
              {data.hourly[t].temp.toFixed(1)} <span>&#8451;</span>
            </div>
            <time>{new Date(data.hourly[t].dt * 1000).toLocaleTimeString().slice(0, 5)} hours</time>
          </div>
        ))}
      </div>
      <hr />
      <h2 className={styles.title}>Daily</h2>
      <div className={styles.dailyWrapper}>


      </div>
      {console.log(data)}
      {/* {console.log(new Date(data.hourly[0].dt * 1000).toLocaleTimeString())}
      {console.log(new Date(data.hourly[4].dt * 1000).toLocaleTimeString())}
      {console.log(new Date(data.hourly[8].dt * 1000).toLocaleTimeString())}
      {console.log(new Date(data.hourly[12].dt * 1000).toLocaleTimeString())}
      {console.log(new Date(data.hourly[16].dt * 1000).toLocaleTimeString())}
      {console.log(new Date(data.hourly[20].dt * 1000).toLocaleTimeString())}
      {console.log(new Date(data.hourly[24].dt * 1000).toLocaleTimeString())} */}
    </>
  );
}
