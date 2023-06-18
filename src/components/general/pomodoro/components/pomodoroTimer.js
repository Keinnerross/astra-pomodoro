import styles from "@/styles/componentes/general/pomodoro/components/pomodoroTimer.module.css";

const PomoTimer = ({ time, theme }) => {
  const showTime = (time) => {
    const min = parseInt(time / 60);
    const sec = parseInt(time % 60);
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div className={styles.pomodoroContainer}>
      <p
        className={styles.pomoTimeContainer}
        style={{ color: theme.iconColor }}
      >
        {showTime(time)}
      </p>
      <p
        className={styles.focusWarrio}
        style={{ color: theme.iconColor }}
      >
        Focus Warrior{" "}
      </p>
    </div>
  );
};

export default PomoTimer;
