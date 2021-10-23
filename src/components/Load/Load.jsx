import styles from "./Load.module.css";
function Load() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.inscription}>L o a d i n g . . .</div>
        <div className={styles.boxFirst}>
          <div className={styles.first}></div>
        </div>
        <div className={styles.boxSecond}>
          <div className={styles.second}></div>
        </div>
        <div className={styles.boxThird}>
          <div className={styles.third}></div>
        </div>
        <div className={styles.boxForth}>
          <div className={styles.forth}></div>
        </div>
      </div>
    </div>
  );
}

export default Load;
