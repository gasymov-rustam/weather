import { useHistory } from "react-router";
import styles from "./Weather.module.css";

function RoutetoFullInformation({ data }) {
  const history = useHistory();
  return (
    <button
      className={styles.fullWeather}
      onClick={() => history.push(`/city/${data.name},${data.sys.country}`)}
    >
      <span>more</span> ...
    </button>
  );
}

export default RoutetoFullInformation;
