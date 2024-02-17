// import styles from "@/styles/componentes/web/sidebar/sidebar.module.css";

/*Import Icons */
import { AiOutlineMenu } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { TbMessageLanguage } from "react-icons/tb";
import { MdHelp, MdLogout, MdSettings } from "react-icons/md";
import { BsFillRocketFill } from "react-icons/bs";
import Language from "./components/language";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

// import { BiSolidHelpCircle, BiLogOut } from "react-icons/bi";

const SidebarNav = ({
  theme,
  ifActive,
  activeHelp,
  numberTheme,
  themeOpacity,
}) => {

  const configTheme = {
    iconSize: 22,
  };

  const [languageActive, setLanguageActive] = useState(false);

  const ifLanguageActive = () => {
    setLanguageActive(!languageActive);
  };

  const logOut = async (tkn) => {
    const userConfirmed = confirm("Do yo want log out session?");
    if (userConfirmed) {
      await signOut(tkn);
      location.reload();
    }
  };

  return (
    <div
      className={styles.sidebarMain}
      style={{ backgroundColor: configTheme.themeColor }}
    >
      <Language isActive={languageActive} handleActive={ifLanguageActive} />

      <div className={styles.sidebarSection}>
        <div className={styles.navSection}>
          <div className={styles.iconTopContainer}>
            <button className={styles.iconContainerTop}>
              <BsFillRocketFill
                size={configTheme.iconSize}
                fill={"fff"}
              />
            </button>
          </div>
          <div className={styles.navTopSection}>
            <button className={styles.iconContainer} onClick={() => ifActive()}>
              {/***Modal */}

              <FaPaintBrush
                size={configTheme.iconSize}
                fill={"fff"}
              />
            </button>

            <button
              className={styles.iconContainer}
              onClick={() => ifLanguageActive()}
            >
              <TbMessageLanguage
                size={configTheme.iconSize}
                fill={"fff"}
              />
            </button>
            <button
              className={styles.iconContainer}
              onClick={() => activeHelp()}
            >
              <MdHelp
                size={configTheme.iconSize}
                fill={"fff"}
              />
            </button>
          </div>
        </div>

        <div className={styles.settingSection}>
          {/* <button className={styles.iconContainer}>
            <MdSettings
              size={configTheme.iconSize}
              fill={"fff"}
            />
          </button> */}
          <button className={styles.iconContainer} onClick={() => logOut(auth)}>
            <MdLogout
              size={configTheme.iconSize}
              fill={"fff"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
