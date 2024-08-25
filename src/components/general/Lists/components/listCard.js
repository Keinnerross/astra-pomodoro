import { useEffect, useState, useContext, Fragment } from "react";
import styles from "@/styles/componentes/general/tasks/components/listCard.module.css";
import ListSettingMenu from "./listSettingMenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import DragTasks from "./tasksComponents/dragTasks";
import { AppContext } from "@/Context/store";
import * as ListsServices from "@/components/general/Lists/components/addListFormComponents/listsServices/listsServices";



const ListCard = ({ listObj, deleteLista}) => {


  /*Configuracion Btns */
  const configTheme = {
    themeColor: "#0A2841",
    iconSize: 25,
    iconColor: "white",
  };



  /*Estado dónde se guardan las tareas */
  const { userLog, idUserLog } = useContext(AppContext);
  const [taskDtArr, setTaskDtArr] = useState([]);
  const [settingActive, setSettingActive] = useState(false);
  const [thisList, setThisList] = useState({})
  const [listName, setListName] = useState("");







  useEffect(() => {
    setTaskDtArr(listObj.tasks);
    setThisList(listObj);
    setListName(listObj.listName);
  }, []);





  const toggleSettingList = () => {
    setSettingActive(!settingActive);
  };

  // Task List Change Controller 
  const handleTaskListChange = (tasks) => {
    setTaskDtArr(tasks);
  }

  const handleListNameChange = (e) => {
    const { value } = e.target;
    setListName(value);
    ListsServices.updateList(idUserLog, userLog, value, listObj.id)
  }







  return (
    <div className={styles.TaskCardContainer}>
      {/********************************************
       *** *** Menu Flotante
       *******************************************/}
      <ListSettingMenu
        active={settingActive}
        deleteList={deleteLista}
        idList={thisList.id}
        handleModal={toggleSettingList}
      />

      <Fragment>
        <div className={styles.taskCardSection}>
          <div className={styles.titleListSection}>

            <input className={styles.inputTextList}
              defaultValue={listName}
              onChange={(e) => handleListNameChange(e)}

            />
            <div
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.dotSettingButton}
                onClick={() => toggleSettingList()}
              >
                <BsThreeDotsVertical fill={configTheme.iconColor} />
              </button>
            </div>
          </div>

          {/******************
         **Tareas
         *****************/}


          <div
            className={styles.taskRenderContainer}

          >
            <DragTasks idList={thisList.id} taskDtArr={taskDtArr} handleTaskListChange={handleTaskListChange} />

          </div>


          {taskDtArr.length > 2 ?
            <span className={styles.AboutListBtn}>{taskDtArr.length - 3} elementos más en tu lista</span>
            : null}


        </div >
      </Fragment>
    </div >
  );
};

export default ListCard;


