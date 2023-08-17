import styles from "@/styles/componentes/general/tasks/components/listSettingMenu.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";

const ListSettingMenu = ({ active, deleteList, idList, handleModal }) => {
  return (
    <>
      <div
        className={active ? styles.listSettingMain : styles.hidden}
        onClick={() => handleModal()}
      ></div>
      <div className={active ? styles.listSettingContainer : styles.hidden}>
        <div>
          <button className={styles.buttonlistSetting}>
            <BiArchiveIn />
            <span>Archive</span>
          </button>
          <button
            className={styles.buttonlistSetting}
            onClick={() => deleteList(idList)}
          >
            <AiOutlineDelete /> <span>Delete</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ListSettingMenu;
