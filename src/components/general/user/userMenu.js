import styles from "@/styles/componentes/general/user/userMenu.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

import { RiAccountCircleFill, RiLogoutBoxFill } from "react-icons/ri";

import { FaPaypal } from "react-icons/fa";

const UserMenu = ({ isActive, userData, toggleMenu }) => {
  const logOut = async (tkn) => {
    await signOut(tkn);
    location.reload();
  };

  const iconSetting = {
    size: 20,
  };

  return (
    <>
      <div
        className={isActive ? styles.userMenuMain : styles.hidden}
        onClick={() => toggleMenu()}
      ></div>

      <div className={isActive ? styles.userMenuContainer : styles.hidden}>
        <div className={styles.userMenuSection}>
          <div className={styles.userProfileSection}>
            <div className={styles.imgUserContainer}>
              <div
                className={styles.userImg}
                style={{
                  backgroundImage: `url(${userData ? userData.photoURL : ""})`,
                }}
              ></div>
            </div>
            <div className={styles.infoUserContainer}>
              <h4>{userData ? userData.displayName : "Invitado"}</h4>
              <span>{userData ? userData.email : ""}</span>
            </div>
          </div>

          <div className={styles.buttonSettingContainer}>
            <RiAccountCircleFill size={iconSetting.size} />

            <span>Account</span>
          </div>
          <div className={styles.buttonSettingContainer}>
            <FaPaypal size={iconSetting.size} />
            <a href="https://www.paypal.me/keinnerr" target="_blank">
              <span>Donate</span>
            </a>
          </div>
          <div
            className={styles.buttonSettingContainer}
            onClick={() => logOut(auth)}
          >
            <RiLogoutBoxFill size={iconSetting.size} />

            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
