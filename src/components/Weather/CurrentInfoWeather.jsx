import CurrentInfoWeatherGeneral from "./CurrentInfoWeatherGeneral";
import CurrentInfoWeatherTemperature from "./CurrentInfoWeatherTemperature";
import CurrentInfoWeatherWind from "./CurrentInfoWeatherWind";
import styles from "./Weather.module.css";
function CurrentInfoWeather({ data }) {
  return (
    <>
      <p className={styles.weatherDescription}>
        {data.weather[0].main}, {data.weather[0].description}
      </p>
      <div className={styles.generalDataWrapper}>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          width="150"
          height="150"
          loading="lazy"
          alt="didn`t find"
          className={styles.icon}
        />
        <CurrentInfoWeatherGeneral data={data} />
        <CurrentInfoWeatherTemperature data={data} />
        <CurrentInfoWeatherWind data={data} />
      </div>
    </>
  );
}

export default CurrentInfoWeather;
