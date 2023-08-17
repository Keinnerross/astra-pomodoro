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
  collection,
  doc,
  addDoc,
  updateDoc,
  update,
  onSnapshot,
  getDocs,
  getDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

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
  const [wallpaperSelected, setWallpaperSelected] = useState(4);
  const [activeBrush, setActiveBrush] = useState(false);
  const [ifOpenHelp, setIfOpenHelp] = useState(false);
  const [ifOpenLogin, setIfOpenLogin] = useState(false);
  const [ifOpenRegister, setIfOpenRegister] = useState(false);
  const [ifOpenUserMenu, setIfOpenUserMenu] = useState(false);
  const [userLog, setUserLog] = useState(null);
  const [userData, setUserData] = useState(null);

  const [idUserLog, setIdUserLog] = useState("");
  const [imgProfile, setImgProfile] = useState(null);
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
  const handleWalpapper = async (value) => {
    try {
      const bgData = value;
      setWallpaperSelected(bgData);

      if (userLog) {
        const docRef = doc(db, "users", idUserLog);
        await updateDoc(docRef, {
          bg: bgData,
        });
      } else {
        localStorage.setItem("bg", bgData);
      }
    } catch (e) {}
  };

  /*Función para Obtener preferencias de tema del usuario (Wallpapers, Opacity, etc...) */
  const getUserTheme = async () => {
    try {
      if (userLog) {
        const docRef = doc(db, "users", idUserLog);
        const querySnapshot = await getDoc(docRef);
        const data = querySnapshot.data().bg;
        setWallpaperSelected(data ? data : localStorage.getItem("bg") || 4);
      }
    } catch (e) {
      console.log(e);
    }
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
    /*Validando usuario y actualizando estados para las credenciales*/
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLog(true);
        setIdUserLog(user.uid);
        setImgProfile(user.photoURL);
        setUserData(user);
        console.log("Usuario Logueado");
      } else {
        setUserLog(false);

        console.log("Usuario sin inicial session");
      }
    });
  }, []);

  useEffect(() => {
    /*Obtener las preferencias del tema del usuario desde firebase */
    getUserTheme();
  }, [userLog]);

  return (
    <div>
      {/*Tengo pensado maejar todas las ventanas de configuracion desde el loyout de sea forma puedo pasar los parametros de setting de manera global y al componente pomodoro */}

      <SelectTheme
        isActive={activeBrush}
        handleTheme={handlethemeSelected}
        handleRangeOpacity={handleRangeOpacity}
        handleWalpapper={handleWalpapper}
      />

      <WhatIsPomodoro ifOpen={ifOpenHelp} toggleInfoPomo={ifActiveHelp} />
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
      <UserMenu
        isActive={ifOpenUserMenu}
        modalRest={toggleOff}
        userData={userData}
        toggleMenu={toggleOff}
      />
      <div
        style={{
          backgroundImage: `url(${wallpaper})`,
        }}
        className={styles.bgDashboard}
      >
        <div className={styles.HeaderContainer}>
          <Header
            theme={themes}
            activeLogin={ifActiveLogin}
            imgProfile={imgProfile}
            userLog={userLog}
          />
        </div>
        <div className={styles.sidebarContainer}>
          <SidebarNav
            theme={themes}
            ifActive={ifActiveBrush}
            numberTheme={themeSelected}
            themeOpacity={opacityValue}
            activeHelp={ifActiveHelp}
          />
        </div>
        <div className={styles.bgSection}>
          <div>
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
                    bgTheme={themes(opacityValue)[themeSelected].themeColor}
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
