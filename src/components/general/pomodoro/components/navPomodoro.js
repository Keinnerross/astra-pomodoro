
import styles from '@/styles/componentes/general/pomodoro/components/navPomodoro.module.css';

const NavPomodoro = ({ updatePomoSession, sessionSelect, pomoCount, shortCount, longCount }) => {
  return (
    <div className={styles.navPomodoroContainer}>
      <div className={`${styles.navPomoSection} flex justify-center gap-[10px] md:gap-50px`}>


        <button
          className={`${sessionSelect == 'Pomodoro' ? styles.navItemActive : styles.navItem} flex flex-col-reverse items-center md:inline-block text-[13px] md:text-[16px]`}
          onClick={() => updatePomoSession('Pomodoro')}
        >
          <span className='font-semibold text-[13px] md:text-[16px] '>{pomoCount} </span>
          <span className={`${styles.navText} text-[13px] md:text-[16px]`}>Pomodoro</span>
        </button>

        <button
          className={`${sessionSelect == 'Short' ? styles.navItemActive : styles.navItem} flex flex-col-reverse items-center md:inline-block text-[13px] md:text-[16px]`}
          onClick={() => updatePomoSession('Short')}
        >
          <span className='font-semibold text-[13px] md:text-[16px] '>{shortCount} </span>
          <span className={`${styles.navText} text-[13px] md:text-[16px]`}>Short Break</span>
        </button>
        <div
          className={`${sessionSelect == 'Long' ? styles.navItemActive : styles.navItem} flex flex-col-reverse items-center md:inline-block `}
          onClick={() => updatePomoSession('Long')}
        >
          <span className='font-semibold text-[13px] md:text-[16px] '>{longCount} </span>
          <span className={`${styles.navText} text-[13px] md:text-[16px]`}>Long Break</span>
        </div>
      </div>

    </div >
  );
};

export default NavPomodoro;
