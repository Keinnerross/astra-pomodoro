import { useEffect } from 'react';
import styles from '@/styles/componentes/general/pomodoro/components/pomodoroTimer.module.css';


const PomoTimer = ({ time }) => {
  const showTime = (time) => {
    const min = parseInt(time / 60);
    const sec = parseInt(time % 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  };


  useEffect(() => {
    document.title = `${showTime(time)} - Focus Warrior! `;
  }, [time]);


  return (




    <div className={styles.pomodoroContainer}>
      <span
        className={`${styles.pomoTimeContainer} text-[6.1rem]   md:text-[7.1rem] `}
      >
        {showTime(time)}
      </span>
    </div>
  );
};

export default PomoTimer;
