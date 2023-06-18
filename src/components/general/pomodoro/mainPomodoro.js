import { useState, useEffect } from "react";
import styles from "@/styles/componentes/general/pomodoro/mainPomodoro.module.css";

import NavPomodoro from "./components/navPomodoro";
import ButtonsPomo from "./components/buttonsPomodoro";
import PomoTimer from "./components/pomodoroTimer";
import CyclePomo from "./components/cyclePomo";
import ProgressBar from "./components/progressBar";
import { themes } from "../userTemplates/mainUserTemplates";

const MainPomodoro = ({ settingConfig, ifOpen }) => {
  /*Configuración del Tema */

  const themeSelect = themes[1];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
  };

  /*Pomodoro Variables*/

  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [timeId, setTimeId] = useState(0);
  const [pomoValue, setPomoValue] = useState(25);
  const [shortValue, setShortValue] = useState(5);
  const [longValue, setLongValue] = useState(15);
  const [pomoSession, setPomoSession] = useState("Pomodoro");
  const [barValue, setBarValue] = useState();
  const [cyclePomo, setCyclePomo] = useState(0);

  /*-------------------------*/
  /*   Pomodoro Functions   */
  /*-----------------------*/

  /******** Render Pomodoro********/

  useEffect(() => {
    setPomoValue(settingConfig.pomodoro);
    setShortValue(settingConfig.short);
    setLongValue(settingConfig.long);
  }, [settingConfig]);

  useEffect(() => {
    let runningPomo = null;

    if (isActive) {
      runningPomo = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      setTimeId(runningPomo);
    } else {
      clearInterval(timeId);
    }
    console.log("effect");
  }, [isActive]);

  /************** Navigation **************/

  /** Render Navigation **/

  useEffect(() => {
    if (pomoSession == "Pomodoro") {
      setTime(pomoValue * 60);
      setBarValue(pomoValue);
    } else if (pomoSession == "Short") {
      setTime(shortValue * 60);
      setBarValue(shortValue);
    } else if (pomoSession == "Long") {
      setTime(longValue * 60);
      setBarValue(longValue);
    }
  }, [pomoSession, pomoValue, shortValue, longValue]);

  /****Cycle Pomodoro Sessions */

  useEffect(() => {
    if (time == 0 && pomoSession == "Pomodoro" && cyclePomo < 3) {
      setTime(shortValue * 60);
      setCyclePomo((cyclePomo) => cyclePomo + 1);
      setIsActive(false);
      setPomoSession("Short");
    } else if (time == 0 && pomoSession == "Short") {
      setTime(pomoValue * 60);
      setIsActive(false);
      setPomoSession("Pomodoro");
    } else if (time == 0 && pomoSession == "Pomodoro" && cyclePomo >= 3) {
      setTime(longValue * 60);
      setIsActive(false);
      setCyclePomo((cyclePomo) => cyclePomo + 1);
      setPomoSession("Long");
    } else if (time == 0 && pomoSession == "Long") {
      setTime(pomoValue * 60);
      setIsActive(false);
      setPomoSession("Pomodoro");
      setCyclePomo(0);
    } /*Faltan Agregar Algunos Condicionales. */
  }, [time]);

  /* Update Pomodoro Session */

  const updatePomoSession = (session) => {
    setPomoSession(session);
  };

  /*********Buttons Functions ************/

  const playPomo = () => {
    setIsActive(!isActive);
  };

  const restPomo = () => {
    setIsActive(false);
    if (pomoSession == "Pomodoro") {
      setTime(pomoValue * 60);
    } else if (pomoSession == "Short") {
      setTime(shortValue * 60);
    } else if (pomoSession == "Long") {
      setTime(longValue * 60);
    }
  };

  const stopPomo = () => {
    setIsActive(false);
    setTime(pomoValue * 60);

    /*Agergar el reincio de los ciclos del pomodoro */
  };

  /*********** BARRA DE PROGRESO******** */

  return (
    <div
      className={styles.pomodoroMainContainer}
      style={{ backgroundColor: configTheme.themeColor }}
    >
      <NavPomodoro updatePomoSession={updatePomoSession} ifOpen={ifOpen} />
      <PomoTimer time={time} theme={configTheme} />
      <ButtonsPomo
        playPomo={playPomo}
        restPomo={restPomo}
        stopPomo={stopPomo}
      />
      <h3 style={{ color: "white" }}>
        <CyclePomo cyclePomo={cyclePomo} />
        /4 {pomoSession}
      </h3>
      <ProgressBar time={time} barValue={barValue} />
    </div>
  );
};

export default MainPomodoro;
