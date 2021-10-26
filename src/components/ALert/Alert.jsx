import { useHistory } from "react-router";
import styles from "./Alert.module.css";

export default function Alert({ visibility }) {
  const history = useHistory();
  function handler (){
    visibility(false);
    history.push(`/search`)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <h3>City not found, please try again!</h3>
        <button onClick={handler}>Back to Search</button>
      </div>
    </div>
  );
}
