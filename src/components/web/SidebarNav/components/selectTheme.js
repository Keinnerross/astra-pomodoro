import { useEffect } from "react";
import styles from "@/styles/componentes/web/sidebar/components/selectTheme.module.css";
import { wallpapers } from "../../../general/userTemplates/mainUserTemplates";

const SelectTheme = ({
  isActive,
  handleTheme,
  handleRangeOpacity,
  handleWalpapper,
  handleClose,
}) => {
  // useEffect(() => {
  //   console.log(wallpapers[0].wallpaper);
  // }, []);
  const themes = {
    blackTheme: 0,
    whiteTheme: 1,
  };

  return (
    <>
      <div
        className={isActive ? styles.selectThemeMain : styles.hidden}
        onClick={() => handleClose()}
      ></div>

      <div className={isActive ? styles.selectThemeContainer : styles.hidden}>
        <div className={styles.selectThemeSection}>
          <h3>Theme</h3>
          <div className={styles.customItemsSection}>
            <button
              className={styles.theme1}
              onClick={() => handleTheme(themes.blackTheme)}
            ></button>
            <button
              className={styles.theme2}
              onClick={() => handleTheme(themes.whiteTheme)}
            ></button>
          </div>
        </div>
        <div className={styles.selectThemeSection}>
          <h3>Opacity </h3>
          <input type="range" onChange={(e) => handleRangeOpacity(e)}></input>
        </div>
        <div className={styles.selectThemeSection}>
          <h3>Wallpapers</h3>
          <div className={styles.customItemsSection}>
            {wallpapers.map((wallpapers, i) => (
              <div
                className={styles.wallpaperBtn}
                key={i}
                onClick={() => handleWalpapper(i)}
              >
                <img
                  className={styles.wallpaperImg}
                  src={`${wallpapers.wallpaper}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTheme;
