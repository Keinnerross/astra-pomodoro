
import styles from "@/styles/componentes/general/pomodoro/components/navPomodoro.module.css";

const NavPomodoro = ({ updatePomoSession, sessionSelect }) => {
  return (
    <div className={styles.navPomodoroContainer}>
      <div className={styles.navPomoSection}>
        <button
          className={sessionSelect == "Pomodoro" ? styles.navItemActive : styles.navItem}
          onClick={() => updatePomoSession("Pomodoro")}
        >
          <span className={styles.navText}>Pomodoro</span>
        </button>
        <button
          className={sessionSelect == "Short" ? styles.navItemActive : styles.navItem}
          onClick={() => updatePomoSession("Short")}
        >
          <span className={styles.navText}>Short Break</span>
        </button>
        <button
          className={sessionSelect == "Long" ? styles.navItemActive : styles.navItem}
          onClick={() => updatePomoSession("Long")}
        >
          <span className={styles.navText}>Long Break</span>
        </button>
      </div>

    </div>
  );
};

export default NavPomodoro;
