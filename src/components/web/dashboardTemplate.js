"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/componentes/web/dashboardTemplate.module.css";
import SidebarNav from "@/components/web/SidebarNav/sidebarNav";
import Header from "@/components/web/header/header";
import MainPomodoro from "../general/pomodoro/mainPomodoro";
import SettingsPomodoro from "../general/pomodoro/settingsPomodoro";
import WhatIsPomodoro from "@/components/web/SidebarNav/components/whatIsPomodoro";
import MainTasks from "../general/tasks/mainTasks";
import UserLogin from "@/components/general/user/login";
import UserRegister from "../general/user/register";
import UserMenu from "../general/user/userMenu";
import SelectTheme from "./SidebarNav/components/selectTheme";
import {
  onAuthStateChanged, //*Esto identifica si la autentificacion ha cambiado.//
} from "firebase/auth";
import { auth } from "../../../firebase";

import { themes, wallpapers } from "../general/userTemplates/mainUserTemplates";

const DashboardTemplate = () => {
  const [settingPomoOpen, setSettingPomoOpen] = useState(false);
  const [settingResult, setSettingResult] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
  });
  const [themeSelected, setThemeSelected] = useState(1);
  const [opacityValue, setOpacityValue] = useState(0.5);
  const [wallpaperSelected, setWallpaperSelected] = useState(1);
  const [activeBrush, setActiveBrush] = useState(false);
  const [ifOpenHelp, setIfOpenHelp] = useState(false);
  const [ifOpenLogin, setIfOpenLogin] = useState(false);
  const [ifOpenRegister, setIfOpenRegister] = useState(false);
  const [ifOpenUserMenu, setIfOpenUserMenu] = useState(false);
  const [userLog, setUserLog] = useState(null);
  const [idUserLog, setIdUserLog] = useState("");
  const wallpaper = wallpapers[wallpaperSelected].wallpaper;

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

  const ifActiveHelp = () => {
    setIfOpenHelp(!ifOpenHelp);
  };

  //**Funciones para los Temas**/
  /*Función para cambiar entre tema y tema (Colores Blanco y negro) */
  const handlethemeSelected = (value) => {
    setThemeSelected(value);
  };

  /*Función para cambiar la opacidad del color de los modulos del tema */
  const handleRangeOpacity = (e) => {
    const valueRange = e.target.value / 100;
    setOpacityValue(valueRange);
  };

  /*Función para cambiar el Wallpaper*/
  const handleWalpapper = (value) => {
    setWallpaperSelected(value);
  };

  /*Login/Register Controles */

  const ifActiveLogin = () => {
    if (userLog) {
      setIfOpenUserMenu(!ifOpenUserMenu);
    } else {
      setIfOpenLogin(!ifOpenLogin);
    }
  };
  const ifActiveRegister = () => {
    setIfOpenLogin(false);
    setIfOpenRegister(true);
  };

  const toggleOff = () => {
    setIfOpenLogin(false);
    setIfOpenRegister(false);
    setIfOpenUserMenu(false);
  };

  const ifHandleActive = () => {
    setIfOpenLogin(true);
    setIfOpenRegister(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLog(true);
        setIdUserLog(user.uid);
        console.log("Usuario Logueado");
      } else {
        setUserLog(false);
        console.log("Usuario sin inicial session");
      }
    });
  }, []);

  return (
    <div>
      {/*Tengo pensado maejar todas las ventanas de configuracion desde el loyout de sea forma puedo pasar los parametros de setting de manera global y al componente pomodoro */}

      <SelectTheme
        isActive={activeBrush}
        handleTheme={handlethemeSelected}
        handleRangeOpacity={handleRangeOpacity}
        handleWalpapper={handleWalpapper}
      />

      <WhatIsPomodoro ifOpen={ifOpenHelp} />
      <UserLogin
        isActive={ifOpenLogin}
        toggleLogin={toggleOff}
        registerActive={ifActiveRegister}
        modalRest={toggleOff}
      />
      <UserRegister
        isActive={ifOpenRegister}
        handleActive={ifHandleActive}
        modalRest={toggleOff}
      />
      <UserMenu isActive={ifOpenUserMenu} modalRest={toggleOff} />
      <div
        style={{
          backgroundImage: `url(${wallpaper})`,
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
              themeOpacity={opacityValue}
              activeHelp={ifActiveHelp}
            />
          </div>
          <div>
            <div className={styles.HeaderContainer}>
              <Header theme={themes} activeLogin={ifActiveLogin} />
            </div>
            <div className={styles.appModuleContainer}>
              <div className={styles.appGadgetsContainer}>
                <div className={styles.pomodoroContainer}>
                  <MainPomodoro
                    numberTheme={themeSelected}
                    ifOpen={ifOpenPomo}
                    settingConfig={settingResult}
                    themeOpacity={opacityValue}
                  />
                </div>
                <div className={styles.TasksViewContainer}>
                  <MainTasks
                    numberTheme={themeSelected}
                    themeOpacity={opacityValue}
                    ifUserLog={userLog}
                    userId={idUserLog}
                  />
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
