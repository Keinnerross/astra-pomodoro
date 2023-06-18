import { useEffect, useState } from "react";
import styles from "@/styles/componentes/general/pomodoro/settingsPomodoro.module.css";
const SettingsPomodoro = ({ updateSetting, ifOpen, closeSetting }) => {
  const [inputValues, setInputValues] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
  });

  useEffect(() => {
    updateSetting(inputValues);
  }, []);

  return (
    <div className={ifOpen ? styles.settingMain : styles.hidden}>
      <div className={styles.settingContainer}>
        <div className={styles.titleCloseSetting}>
          <p>Time Setting</p>
          <button onClick={() => closeSetting(false)}>
            <h2>x</h2>
          </button>
        </div>

        <div className={styles.valuePomos}>
          <p>Pomodoro</p>
          <input
            className={styles.input}
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
            type="number"
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
            type="number"
            onChange={(e) => {
              setInputValues({ ...inputValues, long: e.target.value });
            }}
          />
        </div>
        <div className={styles.valuePomos}>
          <h2>Sound Setting</h2>
          <select
            // selectedValue={changeSound}
            // onValueChange={(value) => changeSound(value)}
            className={styles.picker}
          >
            <option label="Epic 1" value="1" />
            <option label="Epic 2" value="2" />
            <option label="Epic 3" value="3" />
            <option label="Clasic Alarm" value="0" />
          </select>
        </div>
        <button onClick={() => updateSetting(inputValues)}>
          <h3 style={styles.doneButton}>DONE</h3>
        </button>
      </div>
    </div>
  );
};

export default SettingsPomodoro;
