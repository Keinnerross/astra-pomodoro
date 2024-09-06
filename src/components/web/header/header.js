import styles from "@/styles/componentes/web/header/header.module.css";
import Notifications from "../../general/notifications/notifications.js";
import LogoSpartan from "@/components/general/brandComponents/logoComponent.js";

import { BiSearch, BiRefresh } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";



import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";


const settingIcons = {
  size: 28,
  color: "#fff",
}




const Header = ({ theme, activeLogin, imgProfile, userLog, toggleSidebar }) => {


  const refreshPage = () => {
    window.location.reload();
  };

  const [notiActive, setNotiActive] = useState(false);

  const handleNotiActive = () => {
    setNotiActive(!notiActive);
  };
  // className={styles.headerSection}
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[95%] justify-between py-[15px] border-b-solid border-b-[1px] border-b-greyFocus ">
        <Notifications isActive={notiActive} handleActive={handleNotiActive} />
        <div className={styles.elementsHeaderSection}>
          <div className={styles.iconContainer} onClick={() => toggleSidebar()}>
            <AiOutlineMenu
              size={settingIcons.size}
              fill={settingIcons.color}
            />
          </div>
          <div className={styles.logoSection}>
            <LogoSpartan />
          </div>
        </div>



        <div className={styles.elementsHeaderSection}>
          <div className={styles.userHeaderSection}>
            <div className={styles.iconContainer}>
              <button onClick={() => refreshPage()}>
                <BiRefresh
                  size={settingIcons.size}
                  fill={settingIcons.color}
                />
              </button>
            </div>
            <div className={styles.iconContainer}>
              <button onClick={() => handleNotiActive()}>
                <IoMdNotifications
                  size={settingIcons.size}
                  fill={settingIcons.color}
                />
              </button>
            </div>
            <div className={styles.iconContainerImg}>
              <button onClick={() => activeLogin()}>
                {userLog ? (
                  <div
                    className={styles.imgProfileContainer}
                    style={{
                      backgroundImage: `url(
                        ${imgProfile}
                      )`,
                    }}
                  ></div>
                ) : (
                  <FaUserCircle
                    size={settingIcons.size}
                    fill={settingIcons.color}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
