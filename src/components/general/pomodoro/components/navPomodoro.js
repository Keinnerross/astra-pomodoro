import React from "react";

import styles from "@/styles/componentes/general/pomodoro/components/navPomodoro.module.css";
import { AiFillSetting } from "react-icons/ai";
import { themes } from "../../userTemplates/mainUserTemplates";
const NavPomodoro = ({ updatePomoSession, ifOpen }) => {
  const themeSelect = themes[1];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    secundary: themeSelect.secundaryColor,
    iconColor: themeSelect.iconColor,
    iconSize: 25,
  };

  return (
    <div className={styles.navPomodoroContainer}>
      <div className={styles.navPomoSection}>
        <button
          className={styles.navItem}
          style={{
            color: configTheme.iconColor,
            background: configTheme.secundary,
          }}
          onClick={() => updatePomoSession("Pomodoro")}
        >
          <p className={styles.navText}>Pomo</p>
        </button>
        <button
          className={styles.navItem}
          onClick={() => updatePomoSession("Short")}
          style={{
            color: configTheme.iconColor,
            background: configTheme.secundary,
          }}
        >
          <p className={styles.navText}>Short</p>
        </button>
        <button
          className={styles.navItem}
          onClick={() => updatePomoSession("Long")}
          style={{
            color: configTheme.iconColor,
            background: configTheme.secundary,
          }}
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
