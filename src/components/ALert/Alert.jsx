import { useHistory } from "react-router";
import styles from "./Alert.module.css";

export default function Alert({ visibility, coords, setCoords }) {
  const history = useHistory();
  function handler() {
    visibility(false);
    setCoords(false);
    history.push(`/search`);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        {coords ? (
          <h3>Set in your browser preferences "Allow browser to detect location!!"</h3>
        ) : (
          <h3>City not found, please try again!</h3>
        )}
        <button onClick={handler}>Back to Search</button>
      </div>
    </div>
  );
}
