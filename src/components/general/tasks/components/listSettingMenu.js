import React, { useContext } from "react";
import styles from "@/styles/componentes/general/tasks/components/listSettingMenu.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import * as ListsServices from "@/components/general/tasks/components/listsComponents/listsServices/listsServices";
import { AppContext } from "@/Context/store";

const ListSettingMenu = ({ active, deleteList, idList, handleModal }) => {


  return (

    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className={active ? styles.listSettingMain : styles.hidden}
        onClick={() => handleModal()}
      ></div>
      <div className={active ? styles.listSettingContainer : styles.hidden}>

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
      </div >
    </form>

  );
};

export default ListSettingMenu;
