
import styles from '@/styles/componentes/general/pomodoro/components/navPomodoro.module.css';

const NavPomodoro = ({ updatePomoSession, sessionSelect, pomoCount, shortCount, longCount }) => {
  return (
    <div className={styles.navPomodoroContainer}>
      <div className={`${styles.navPomoSection} flex justify-center gap-[10px] md:gap-50px`}>


        <button
          className={`${sessionSelect == 'Pomodoro' ? styles.navItemActive : styles.navItem} flex flex-col-reverse items-center md:inline-block`}
          onClick={() => updatePomoSession('Pomodoro')}
        >
          <span className='font-semibold'>{pomoCount} </span>
          <span className={`${styles.navText} `}>Pomodoro</span>
        </button>


        <button
          className={`${sessionSelect == 'Short' ? styles.navItemActive : styles.navItem} flex flex-col-reverse items-center md:inline-block`}
          onClick={() => updatePomoSession('Short')}
        >
          <span className='font-semibold'>{shortCount} </span>
          <span className={styles.navText}>Short Break</span>
        </button>
        <button
          className={`${sessionSelect == 'Long' ? styles.navItemActive : styles.navItem} flex flex-col-reverse items-center md:inline-block`}
          onClick={() => updatePomoSession('Long')}
        >
          <span className='font-semibold'>{longCount} </span>
          <span className={styles.navText}>Long Break</span>
        </button>
      </div>

    </div >
  );
};

export default NavPomodoro;
