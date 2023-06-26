"use client";

import { useState } from "react";
import styles from "@/styles/componentes/web/dashboardTemplate.module.css";
import SidebarNav from "@/components/web/SidebarNav/sidebarNav";
import Header from "@/components/web/header/header";
import MainPomodoro from "../general/pomodoro/mainPomodoro";
import SettingsPomodoro from "../general/pomodoro/settingsPomodoro";

import MainTasks from "../general/tasks/mainTasks";

import SelectTheme from "./SidebarNav/components/selectTheme";

import { themes } from "../general/userTemplates/mainUserTemplates";

const DashboardTemplate = () => {
  const [activeBrush, setActiveBrush] = useState(false);
  const [settingPomoOpen, setSettingPomoOpen] = useState(false);
  const [settingResult, setSettingResult] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
  });
  const [themeSelected, setThemeSelected] = useState(1);

  /*Functions Setting Pomodoro*/
  const updateSetting = (inputValues) => {
    setSettingResult({
      ...settingResult,
      pomodoro: inputValues.pomodoro,
      short: inputValues.short,
      long: inputValues.long,
    });
    setSettingPomoOpen(false);
  };

  const ifOpenPomo = (value) => {
    setSettingPomoOpen(value);
  };

  // /*Functions Sidebar */
  // /*Brush */
  const ifActiveBrush = () => {
    setActiveBrush(!activeBrush);
  };

  //**Funciones para los Temas**/

  const handlethemeSelected = (value) => {
    setThemeSelected(value);
  };

  return (
    <div>
      {/*Tengo pensado maejar todas las ventanas de configuracion desde el loyout de sea forma puedo pasar los parametros de setting de manera global y al componente pomodoro */}

      <SelectTheme isActive={activeBrush} handleTheme={handlethemeSelected} />
      <div
        style={{
          backgroundImage:
            'url("https://images8.alphacoders.com/105/1054256.jpg")',
          // background: " #80CBC4",
        }}
        className={styles.bgDashboard}
      >
        <div className={styles.bgSection}>
          <div className={styles.sidebarContainer}>
            <SidebarNav
              theme={themes}
              ifActive={ifActiveBrush}
              numberTheme={themeSelected}
            />
          </div>
          <div>
            <div className={styles.HeaderContainer}>
              <Header theme={themes} />
            </div>
            <div className={styles.appModuleContainer}>
              <div className={styles.appGadgetsContainer}>
                <div className={styles.pomodoroContainer}>
                  <MainPomodoro
                    numberTheme={themeSelected}
                    ifOpen={ifOpenPomo}
                    settingConfig={settingResult}
                  />
                </div>
                <div className={styles.TasksViewContainer}>
                  <MainTasks numberTheme={themeSelected} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingsPomodoro
        closeSetting={ifOpenPomo}
        ifOpen={settingPomoOpen}
        updateSetting={updateSetting}
      />
    </div>
  );
};

export default DashboardTemplate;
