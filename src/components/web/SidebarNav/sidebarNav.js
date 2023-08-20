import styles from "@/styles/componentes/web/sidebar/sidebar.module.css";

/*Import Icons */
import { AiOutlineMenu } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { TbMessageLanguage } from "react-icons/tb";
import { MdHelp, MdLogout, MdSettings } from "react-icons/md";
import { BsFillRocketFill } from "react-icons/bs";

// import { BiSolidHelpCircle, BiLogOut } from "react-icons/bi";

const SidebarNav = ({
  theme,
  ifActive,
  activeHelp,
  numberTheme,
  themeOpacity,
}) => {

  const themeSelect = theme(themeOpacity)[numberTheme];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 22,
    iconColor: themeSelect.iconColor,
  };

  const handleSidebarFull = () => {};

  return (
    <div
      className={styles.sidebarMain}
      style={{ backgroundColor: configTheme.themeColor }}
    >
      <div className={styles.sidebarSection}>
        <div className={styles.navSection}>
          <div className={styles.iconTopContainer}>
            <button className={styles.iconContainerTop}>
              <BsFillRocketFill
                size={configTheme.iconSize}
                fill={configTheme.iconColor}
                onClick={() => handleSidebarFull()}
              />
            </button>
          </div>
          <div className={styles.navTopSection}>
            <button className={styles.iconContainer} onClick={() => ifActive()}>
              {/***Modal */}

             

              <FaPaintBrush
                size={configTheme.iconSize}
                fill={configTheme.iconColor}
              />
            </button>
            <button className={styles.iconContainer}>
              <TbMessageLanguage
                size={configTheme.iconSize}
                fill={configTheme.iconColor}
              />
            </button>
            <button
              className={styles.iconContainer}
              onClick={() => activeHelp()}
            >
              <MdHelp
                size={configTheme.iconSize}
                fill={configTheme.iconColor}
              />
            </button>
          </div>
        </div>

        <div className={styles.settingSection}>
          {/* <button className={styles.iconContainer}>
            <MdSettings
              size={configTheme.iconSize}
              fill={configTheme.iconColor}
            />
          </button> */}
          <button className={styles.iconContainer}>
            <MdLogout
              size={configTheme.iconSize}
              fill={configTheme.iconColor}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
