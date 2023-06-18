import styles from "@/styles/componentes/web/header/header.module.css";

const Header = () => {
  const iconSize = 25;
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <div className={styles.logoSection}>
          <h2>LOGOTYPE</h2>
        </div>
        <div className={styles.elementsHeaderSection}>
          <div className={styles.searchBar}>
            <button>search</button>
            <input
              type="text"
              className={styles.textInput}
              placeholder="Search a task group"
            ></input>
          </div>
          <div className={styles.userHeaderSection}>
            <div className={styles.iconContainer}>
              <button>Refresh</button>
            </div>
            <div className={styles.iconContainer}>
              <button>Notification</button>
            </div>
            <div className={styles.iconContainer}>
              <button>User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
