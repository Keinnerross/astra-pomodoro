import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/componentes/general/pomodoro/settingsPomodoro.module.css';
const SettingsPomodoro = ({ updateSetting, ifOpen, closeSetting, handleSelectSound }) => {

  const [inputValues, setInputValues] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
  });

  const selectSoundRef = useRef(null);

  useEffect(() => {
    updateSetting(inputValues);
    if (selectSoundRef.current) {
      const soundSelect = selectSoundRef.current.value;
      handleSelectSound(soundSelect, true)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);



  return (
    <div
      className={ifOpen ? styles.settingMain : styles.hidden}
      onMouseDown={() => closeSetting()}
    >
    


      <div
        className={`${styles.settingContainer}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
       
        <div className={`${styles.settingSection} w-[100vw] h-dvh md:w-[380px] md:h-[420px] md:rounded-t-[9px]`}>

          <div className={styles.titleCloseSetting}>
            <p>Settings</p>
            <button onClick={() => updateSetting(inputValues)}>
              <h2>x</h2>
            </button>
          </div>
          <div className={styles.titleSection}>
            <h4>Timer</h4>
          </div>
          <h4>time (minutes)</h4>
          <div className={styles.valuePomoSection}>
            <div className={styles.valuePomos}>
              <p>Pomodoro</p>
              <input
                className={styles.input}
                type='number'
                defaultValue={25}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    pomodoro: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.valuePomos}>
              <p>Short Break</p>
              <input
                defaultValue={5}
                className={styles.input}
                type='number'
                onChange={(e) => {
                  setInputValues({ ...inputValues, short: e.target.value });
                }}
              />
            </div>
            <div className={styles.valuePomos}>
              <p>Long Break</p>
              <input
                defaultValue={15}
                className={styles.input}
                type='number'
                onChange={(e) => {
                  setInputValues({ ...inputValues, long: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={styles.titleSection}>
            <h4>Sounds</h4>
          </div>
          <div className={styles.soundSection}>
            <span>Alarm Sound</span>
            <select
              onChange={(e) => handleSelectSound(e.target.value)}
              className={styles.picker}
              defaultValue='epic2'
              ref={selectSoundRef}
            >

              <option label='Epic 1' value='epic1' />
              <option label='Epic 2' value='epic2' />
              <option label='Epic Bum' value='epic3' />
              <option label='Skyrim Completed' value='skyrim' />
              <option label='Clasic Alarm' value='clasic' />
            </select>
          </div>
        </div>
        <div className={`!hidden md:!flex ${styles.footerSettingSection}`}>
          <button onClick={() => updateSetting(inputValues)}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPomodoro;
