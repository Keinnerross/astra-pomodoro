"use client";

import { useEffect, useState, useContext, Fragment } from "react";
import { AppContext } from "@/Context/store"
import SidebarMain from "./Sidebar/sidebarMain";
import Header from "@/components/web/header/header";
import MainPomodoro from "../general/pomodoro/mainPomodoro";
import SettingsPomodoro from "../general/pomodoro/settingsPomodoro";
import WhatIsPomodoro from "@/components/web/SidebarNav/components/whatIsPomodoro";
import MainTasks from "../general/Lists/mainLists";
import UserLogin from "@/components/general/user/login";
import UserRegister from "../general/user/register";
import UserMenu from "../general/user/userMenu";

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

const DashboardTemplate2 = () => {
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
  const [ifOpenSidebar, setIfOpenSidebar] = useState(false);
  const [userData, setUserData] = useState(null);

  const { userLog, setUserLog } = useContext(AppContext);

  const { idUserLog, setIdUserLog } = useContext(AppContext);
  const [imgProfile, setImgProfile] = useState(null);

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
  const toggleSidebar = () => {
    setIfOpenSidebar(!ifOpenSidebar)
  }


  // /*Brush */
  // const ifActiveBrush = () => {
  //   setActiveBrush(!activeBrush);
  // };

  // const ifActiveHelp = () => {
  //   setIfOpenHelp(!ifOpenHelp);
  // };


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
        setImgProfile(
          user.photoURL
            ? user.photoURL
            : "https://i.pinimg.com/564x/e3/b4/35/e3b43543b36e3f8cf0a9f5ae652e799c.jpg"
        );
        setUserData(user);
        console.log("Usuario Logueado");
      } else {
        setUserLog(false);

        console.log("Usuario sin inicial session");
      }
    });
  }, []);



  return (
    <Fragment>


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

      <SettingsPomodoro
        closeSetting={ifOpenPomo}
        ifOpen={settingPomoOpen}
        updateSetting={updateSetting}
      />

      <SidebarMain ifOpen={ifOpenSidebar} toggleSidebar={toggleSidebar} />


      {/*//////////////////////////////////////////////
//App Dashboard.
//////////////////////////////////////////////*/}

      <div
        className="bg-blackPrimary min-h-[100vh] pb-[50px]"
      >


        <div >
          <Header
            activeLogin={ifActiveLogin}
            imgProfile={imgProfile}
            userLog={userLog}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div class="flex flex-col">
          <div >
            <div >
              <MainPomodoro
                ifOpen={ifOpenPomo}
                settingConfig={settingResult}
                themeOpacity={opacityValue}
              />
            </div>
            <div >
              <MainTasks
                ifUserLog={userLog}
                userId={idUserLog}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <WhatIsPomodoro/> */}
    </Fragment>
  );
};

export default DashboardTemplate2;
