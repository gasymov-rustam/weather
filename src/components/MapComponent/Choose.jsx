import styles from "./Choose.module.css";
export default function Alert({ open, show }) {
  function handlClick(){
    show(true);
    open(false);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <h3>Are you sure you want to know the weather in the selected location?</h3>
        <div>
          <button onClick={() => handlClick()}>Yes</button>
          <button onClick={() => open(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
