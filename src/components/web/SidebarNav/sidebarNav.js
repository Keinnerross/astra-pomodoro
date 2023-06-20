import styles from "@/styles/componentes/web/sidebar/sidebar.module.css";

/*Import Icons */
import { AiOutlineMenu } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";

import { TbMessageLanguage } from "react-icons/tb";
import { MdHelp, MdLogout, MdSettings } from "react-icons/md";

// import { BiSolidHelpCircle, BiLogOut } from "react-icons/bi";

const SidebarNav = ({ theme, ifActive }) => {
  const themeSelect = theme[1];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
    
  };
  return (
    <div className={styles.sidebarMain}>
      <div className={styles.sidebarSection}>
        <div className={styles.navSection}>
          <button className={styles.iconContainer}>
            <AiOutlineMenu size={configTheme.iconSize} />
          </button>
          <button className={styles.iconContainer} onClick={() => ifActive()}>
            <FaPaintBrush size={configTheme.iconSize} />
          </button>
          <button className={styles.iconContainer}>
            <TbMessageLanguage size={configTheme.iconSize} />
          </button>
          <button className={styles.iconContainer}>
            <MdHelp size={configTheme.iconSize} />
          </button>
        </div>
        <div className={styles.settingSection}>
          <button className={styles.iconContainer}>
            <MdSettings size={configTheme.iconSize} />
          </button>
          <button className={styles.iconContainer}>
            <MdLogout size={configTheme.iconSize} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
