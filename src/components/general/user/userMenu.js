import styles from "@/styles/componentes/general/user/userMenu.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

import { RiAccountCircleFill, RiLogoutBoxFill } from "react-icons/ri";

import { FaPaypal } from "react-icons/fa";
import { useEffect } from "react";

const UserMenu = ({ isActive, userData, toggleMenu }) => {
  const logOut = async (tkn) => {
    await signOut(tkn);
    location.reload();
  };

  const iconSetting = {
    size: 20,
  };

  const user = {
    email: "",
    name: "",
    picture: "",
  };

  useEffect(() => {
    if (userData) {
      user.name = userData.displayName;
      user.email = userData.email;
      user.picture = userData.photoURL;
    }
  }, [userData]);

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
                  backgroundImage: `url(${
                    userData
                      ? userData.photoURL
                      : "https://i.pinimg.com/564x/e3/b4/35/e3b43543b36e3f8cf0a9f5ae652e799c.jpg"
                  })`,
                }}
              ></div>
            </div>
            <div className={styles.infoUserContainer}>
              <h4>{userData ? userData.displayName : `User009`}</h4>
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
