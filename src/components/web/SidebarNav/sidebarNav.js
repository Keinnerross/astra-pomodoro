import styles from "@/styles/componentes/web/sidebar/sidebar.module.css";

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
            <p>Icono Menu</p>
          </button>
          <button className={styles.iconContainer} onClick={() => ifActive()}>
            <p>Icono broch</p>
          </button>
          <button className={styles.iconContainer}>
            <p>Icono Globo</p>
          </button>
          <button className={styles.iconContainer}>
            <p>Icono Ayuda</p>
          </button>
        </div>
        <div className={styles.settingSection}>
          <button className={styles.iconContainer}>
            <p>Icono settings</p>
          </button>
          <button className={styles.iconContainer}>
            <p>Icono LogOut</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
