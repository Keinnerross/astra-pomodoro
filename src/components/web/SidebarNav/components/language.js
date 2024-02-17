// import styles from "../../../../styles/componentes/web/sidebar/components/language.module.css";

const Language = ({ isActive, handleActive }) => {
  return (
    <>
      <div
        className={isActive ? styles.languageMain : styles.hidden}
        onClick={() => handleActive()}
      ></div>
      <div className={isActive ? styles.languageContainer : styles.hidden}>
        <div className={styles.languageSection}>
          <p>LANGUAEG</p>
        </div>
      </div>
    </>
  );
};

export default Language;
