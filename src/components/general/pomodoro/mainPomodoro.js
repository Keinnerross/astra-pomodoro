import { useState, useEffect } from 'react';
import styles from '@/styles/componentes/general/pomodoro/mainPomodoro.module.css';

import NavPomodoro from './components/navPomodoro';
import ButtonsPomo from './components/buttonsPomodoro';
import PomoTimer from './components/pomodoroTimer';
import PhrasesGenerator from './components/phrasesGenerator';
import ProgressBar from './components/progressBar';

const MainPomodoro = ({ settingConfig, ifOpen, playSound }) => {
  /*Configuración del Tema */

  const configTheme = {
    themeColor: 'transparent',
    iconSize: 25,
    iconColor: 'white',
  };

  /*Pomodoro Variables*/

  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [timeId, setTimeId] = useState(0);
  const [pomoValue, setPomoValue] = useState(25);
  const [shortValue, setShortValue] = useState(5);
  const [longValue, setLongValue] = useState(15);
  const [pomoSession, setPomoSession] = useState('Pomodoro');
  const [barValue, setBarValue] = useState();
  const [cyclePomo, setCyclePomo] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [shotCount, setShortCount] = useState(0)
  const [longCount, setLongCount] = useState(0)




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
  }, [isActive]);

  /************** Navigation **************/

  /** Render Navigation **/

  useEffect(() => {
    if (pomoSession == 'Pomodoro') {
      setTime(pomoValue * 60);
      setIsActive(false);
      setBarValue(pomoValue);
    } else if (pomoSession == 'Short') {
      setTime(shortValue * 60);
      setIsActive(false);
      setBarValue(shortValue);
    } else if (pomoSession == 'Long') {
      setTime(longValue * 60);
      setIsActive(false);
      setBarValue(longValue);
    }
  }, [pomoSession, pomoValue, shortValue, longValue]);

  /****Cycle Pomodoro Sessions */

  useEffect(() => {
    if (time <= 0 && pomoSession == 'Pomodoro' && cyclePomo < 3) {
      setTime(shortValue * 60);
      setCyclePomo((cyclePomo) => cyclePomo + 1);
      setIsActive(false);
      playSound();
      setPomoSession('Short');
      setPomodoroCount((prev) => prev + 1);
      playSound();

    } else if (time <= 0 && pomoSession == 'Short') {
      setTime(pomoValue * 60);
      setIsActive(false);
      setPomoSession('Pomodoro');
      setShortCount((prev) => prev + 1);

      playSound();

    } else if (time <= 0 && pomoSession == 'Pomodoro' && cyclePomo >= 3) {
      setTime(longValue * 60);
      setIsActive(false);
      setCyclePomo((cyclePomo) => cyclePomo + 1);
      setPomoSession('Long');
      setPomodoroCount((prev) => prev + 1);

      playSound();
    } else if (time <= 0 && pomoSession == 'Long') {
      setTime(pomoValue * 60);
      setIsActive(false);
      setPomoSession('Pomodoro');
      setCyclePomo(0);
      setLongCount((prev) => prev + 1);
      playSound();

    } /*Faltan Agregar Algunos Condicionales. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const alertConfirm = confirm('Do you want rest time and counts?');
    if (alertConfirm) {
      setIsActive(false);
      setPomodoroCount(0)
      setShortCount(0)
      setLongCount(0)

      if (pomoSession == 'Pomodoro') {
        setTime(pomoValue * 60);
      } else if (pomoSession == 'Short') {
        setTime(shortValue * 60);
      } else if (pomoSession == 'Long') {
        setTime(longValue * 60);
      }
    } else { return; }

  };

  const stopPomo = () => {
    setIsActive(false);
    setTime(pomoValue * 60);

    /*Agergar el reincio de los ciclos del pomodoro */
  };

  /*********** BARRA DE PROGRESO******** */

  return (
    <div
      className='flex flex-col items-center w-full'
    >
      <NavPomodoro
        updatePomoSession={updatePomoSession}
        sessionSelect={pomoSession}
        pomoCount={pomodoroCount}
        shortCount={shotCount}
        longCount={longCount}
      />
      <PomoTimer time={time} theme={configTheme} />
      <PhrasesGenerator />
      <ProgressBar
        pomoSession={pomoSession}
        pomoValue={pomoValue}
        shortValue={shortValue}
        longValue={longValue}
        isActive={isActive}
        time={time} />
      <ButtonsPomo
        playPomo={playPomo}
        restPomo={restPomo}
        stopPomo={stopPomo}
        ifActive={isActive}
        ifOpen={ifOpen}
      />

    </div >
  );
};

export default MainPomodoro;
