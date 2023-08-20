import styles from "@/styles/componentes/web/header/header.module.css";
import Notifications from "../../general/notifications/notifications.js";
import { BiSearch, BiRefresh } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
const Header = ({ theme, activeLogin, imgProfile, userLog }) => {
  const themeSelect = theme(1)[1];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const [notiActive, setNotiActive] = useState(false);

  const handleNotiActive = () => {
    setNotiActive(!notiActive);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <Notifications isActive={notiActive} handleActive={handleNotiActive} />

        <div className={styles.logoSection}>
          <h2 style={{ color: "white" }}>AstraPomodoro</h2>
        </div>
        <div className={styles.elementsHeaderSection}>
          <div className={styles.searchBar}>
            <button>
              <BiSearch
                size={configTheme.iconSize}
                fill={configTheme.iconColor}
              />
            </button>
            <input
              type="text"
              className={styles.textInput}
              placeholder="Search a task group"
            ></input>
          </div>
          <div className={styles.userHeaderSection}>
            <div className={styles.iconContainer}>
              <button onClick={() => refreshPage()}>
                <BiRefresh
                  size={configTheme.iconSize}
                  fill={configTheme.iconColor}
                />
              </button>
            </div>
            <div className={styles.iconContainer}>
              <button onClick={() => handleNotiActive()}>
                <IoMdNotifications
                  size={configTheme.iconSize}
                  fill={configTheme.iconColor}
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
                    size={configTheme.iconSize}
                    fill={configTheme.iconColor}
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
