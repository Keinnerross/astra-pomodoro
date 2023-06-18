import { useEffect } from "react";
import styles from "@/styles/componentes/web/sidebar/components/selectTheme.module.css";
import { wallpapers } from "../../../general/userTemplates/mainUserTemplates";

const SelectTheme = ({ isActive }) => {
  useEffect(() => {
    console.log(wallpapers[0].wallpaper);
  }, []);

  return (
    <div className={isActive ? styles.selectThemeContainer : styles.hidden}>
      <div className={styles.selectThemeSection}>
        <h3>Theme</h3>
        <div className={styles.customItemsSection}>
          <button className={styles.theme1}></button>
          <button className={styles.theme2}></button>
        </div>
      </div>
      <div className={styles.selectThemeSection}>
        <h3>Wallpapers</h3>
        <div className={styles.customItemsSection}>
          {wallpapers.map((wallpapers, i) => (
            <button key={i}>
              <img
                src={`${wallpapers.wallpaper}`}
                className={styles.wallpaperBtn}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTheme;
