// import { context } from "../context/store";
import styles from "@/styles/componentes/general/pomodoro/components/progressBar.module.css";

const ProgressBar = ({ barValue, time }) => {
  //   const { time } = useContext(context);
  //   const { pomoSetting } = useContext(context);
  //   const { shortBreak } = useContext(context);
  //   const { longBreak } = useContext(context);
  //   const { pomoSession } = useContext(context);

  // useEffect(() => {
  //   if (pomoSession == "Pomodoro") {
  //     setBarValue(pomoSetting);
  //   } else if (pomoSession == "Short") {
  //     setBarValue(shortBreak);
  //   } else if (pomoSession == "Long") {
  //     setBarValue(longBreak);
  //   }
  // }, [time]);

  const barProgress = (time / 60 / barValue) * 100; /*Corregir */

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${barProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
