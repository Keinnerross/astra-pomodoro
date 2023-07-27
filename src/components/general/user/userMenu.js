import styles from "@/styles/componentes/general/user/userMenu.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

const UserMenu = ({ isActive, modalRest }) => {
  const logOut = async (tkn) => {
    await signOut(tkn);
    location.reload();
  };

  return (
    <div className={isActive ? styles.userMenuContainer : styles.hidden}>
      <button onClick={() => logOut(auth)}>Logout</button>
    </div>
  );
};

export default UserMenu;



