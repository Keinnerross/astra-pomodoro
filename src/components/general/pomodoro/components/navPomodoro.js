import React from "react";

import styles from "@/styles/componentes/general/pomodoro/components/navPomodoro.module.css";
import { AiFillSetting } from "react-icons/ai";
const NavPomodoro = ({ updatePomoSession, ifOpen }) => {
  return (
    <div className={styles.navPomodoroContainer}>
      <div className={styles.navPomoSection}>
        <button
          className={styles.navItem}
          onClick={() => updatePomoSession("Pomodoro")}
        >
          <p className={styles.navText}>Pomo</p>
        </button>
        <button
          className={styles.navItem}
          onClick={() => updatePomoSession("Short")}
        >
          <p className={styles.navText}>Short</p>
        </button>
        <button
          className={styles.navItem}
          onClick={() => updatePomoSession("Long")}
        >
          <p className={styles.navText}>Long</p>
        </button>
      </div>

      <button className={styles.settingPomoButton} onClick={() => ifOpen(true)}>
        <AiFillSetting size={20} fill={"white"} />
      </button>
    </div>
  );
};

export default NavPomodoro;
