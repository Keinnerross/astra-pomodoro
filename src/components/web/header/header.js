import styles from "@/styles/componentes/web/header/header.module.css";
import { BiSearch, BiRefresh } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

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
            <button>
              <BiSearch size={iconSize} />
            </button>
            <input
              type="text"
              className={styles.textInput}
              placeholder="Search a task group"
            ></input>
          </div>
          <div className={styles.userHeaderSection}>
            <div className={styles.iconContainer}>
              <button>
                <BiRefresh size={iconSize} />
              </button>
            </div>
            <div className={styles.iconContainer}>
              <button>
                <IoMdNotifications size={iconSize} />
              </button>
            </div>
            <div className={styles.iconContainer}>
              <button>
                <FaUserCircle size={iconSize} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
