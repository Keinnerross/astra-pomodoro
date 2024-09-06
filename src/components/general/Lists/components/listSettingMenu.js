import React, { useContext } from "react";
import styles from "@/styles/componentes/general/tasks/components/listSettingMenu.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { Tooltip } from 'react-tooltip'

const ListSettingMenu = ({ active, deleteList, idList, handleModal }) => {


  return (

    <form
      className="flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className={`${active ? styles.listSettingMain : styles.hidden}`}
        onClick={() => handleModal()}
      ></div>


      <div className={`${active ? `${styles.listSettingContainer}
        top-[40px] right-[52px]
        md:right-[-105px] absolute w-[120px] md:top-[15px] rounded-[4px] ` : styles.hidden}`}>

        <button
          data-tooltip-id="my-tooltip" data-tooltip-content="This feature will be available soon"
          className={styles.buttonlistSetting}>
          <BiArchiveIn />
          <span>Archive</span>
        </button>
        <Tooltip id="my-tooltip" place={"right"} style={{ backgroundColor: "#d9212c ", color: "white", borderRadius: "10px" }} effect="float" events={['click']} />
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



