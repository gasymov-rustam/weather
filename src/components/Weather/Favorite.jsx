import { useData } from "../../hooks/useData";
import styles from "./Weather.module.css";
function Favorite({data}) {
  const [{citiesId}, dispatch] = useData()
  return (
    <label className={styles.favorite}>
      <input
        type="checkbox"
        name="favor"
        className={styles.favoriteCheckbox}
        checked={citiesId.includes(data.id)}
        hidden
        onChange={() => dispatch({ type: "CHANGE_CITY", payload: data.id })}
      />
      <span>&#127892;</span>
    </label>
  );
}

export default Favorite;
