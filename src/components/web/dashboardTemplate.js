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

  /*Functions */
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

  return (
    <div>
      {/*Tengo pensado maejar todas las ventanas de configuracion desde el loyout de sea forma puedo pasar los parametros de setting de manera global y al componente pomodoro */}

      <SelectTheme isActive={activeBrush} />
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
          // background: " #80CBC4",
        }}
        className={styles.bgDashboard}
      >
        <div className={styles.bgSection}>
          <div className={styles.sidebarContainer}>
            <SidebarNav theme={themes} ifActive={ifActiveBrush} />
          </div>
          <div>
            <div className={styles.HeaderContainer}>
              <Header theme={themes} />
            </div>
            <div className={styles.appModuleContainer}>
              <div className={styles.appGadgetsContainer}>
                <div className={styles.pomodoroContainer}>
                  <MainPomodoro
                    ifOpen={ifOpenPomo}
                    settingConfig={settingResult}
                  />
                </div>
                <div className={styles.TasksViewContainer}>
                  <MainTasks />
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
