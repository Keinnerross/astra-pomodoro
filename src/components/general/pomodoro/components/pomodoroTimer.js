import styles from "@/styles/componentes/general/pomodoro/components/pomodoroTimer.module.css";
import { useEffect } from "react";

const PomoTimer = ({ time, theme }) => {
  const showTime = (time) => {
    const min = parseInt(time / 60);
    const sec = parseInt(time % 60);
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  /*Generación de Título dinámico*/
  (() => {
    document.title = `${showTime(time)} - Focus Warrior! `;
  })();
  /**/
  
  return (
    <div className={styles.pomodoroContainer}>
      <p
        className={styles.pomoTimeContainer}
        style={{ color: theme.iconColor }}
      >
        {showTime(time)}
      </p>
    </div>
  );
};

export default PomoTimer;
