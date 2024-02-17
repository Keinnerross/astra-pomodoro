
import styles from "@/styles/componentes/general/pomodoro/components/navPomodoro.module.css";

const NavPomodoro = ({ updatePomoSession, sessionSelect }) => {
  return (
    <div className={styles.navPomodoroContainer}>
      <div className={styles.navPomoSection}>
        <button
          className={sessionSelect == "Pomodoro" ? styles.navItemActive : styles.navItem}
          onClick={() => updatePomoSession("Pomodoro")}
        >
          <span className={styles.navText}>pomodoro</span>
        </button>
        <button
          className={sessionSelect == "Short" ? styles.navItemActive : styles.navItem}
          onClick={() => updatePomoSession("Short")}
        >
          <span className={styles.navText}>short break</span>
        </button>
        <button
          className={sessionSelect == "Long" ? styles.navItemActive : styles.navItem}
          onClick={() => updatePomoSession("Long")}
        >
          <span className={styles.navText}>long break</span>
        </button>
      </div>

    </div>
  );
};

export default NavPomodoro;
