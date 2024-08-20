import { useEffect, useState, useRef } from "react";
import styles from "@/styles/componentes/general/tasks/components/listCard.module.css";
import Task from "./taskComponent";
import { db } from "../../../../../firebase";
import {
  doc,
  query,
  getDocs,
  orderBy,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import ListSettingMenu from "./listSettingMenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const ListCard = ({
  idList,
  listName,
  updateList,
  deleteLista,
  tasksDt,
  numberTheme,
  themeOpacity,
  userId,
  newGetData,
}) => {
  /*Configuracion Theme */
  const configTheme = {
    themeColor: "#0A2841",
    iconSize: 25,
    iconColor: "white",
  };
  /*Los temas estan puestos aqui para poder testear los estilos, sin embargo hay que ponerlos de forma atomatica relacionadose con la sidebar */

  /*Controles de lista y tareas */


  /*Estado dónde se guardan las tareas */
  const [taskDtArr, setTaskDtArr] = useState([]);

  const [settingActive, setSettingActive] = useState(false);
  const inputAddTaskRef = useRef(null);
  const inputTitleList = useRef(null);

  /*Funcion de input del titulo actualizacion del nombre de la lista */
  const handleInputChange = (e) => {
    const { value } = e.target;
    updateList(value, idList);
  };




  /*Funcion para eliminar una tarea */

  const deleteTask = async (idList, idTask) => {
    const confirmation = confirm("Estas seguro de eliminar esta tarea?");
    if (confirmation) {
      try {
        if (userId) {
          const docRef = doc(
            db,
            "users",
            userId,
            "lists",
            idList,
            "tasks",
            idTask
          );
          const newlistTasks = taskDtArr.filter(
            (tasks) => tasks.taskId !== idTask
          );
          setTaskDtArr(newlistTasks);
          await deleteDoc(docRef);
        } else {
          const storedArray = JSON.parse(localStorage.getItem("lists"));
          let tasksArr;
          storedArray.forEach((list) => {
            if (list.id === idList) {
              tasksArr = list.tasks;
            }
          });
          const updateTasks = tasksArr.filter((task) => task.taskId !== idTask);

          const updateLists = storedArray.map((list, i) => {
            if (list.id === idList) {
              return { ...list, tasks: updateTasks };
            } else {
              return list;
            }
          });

          localStorage.setItem("lists", JSON.stringify(updateLists));
          newGetData();
        }
      } catch (e) {
        alert("Hubo un problema en eliminar" + e);
      }
    } else {
      return;
    }
  };

  const [viewThreeTask, setViewThreeTask] = useState([])


  useEffect(() => {
    setTaskDtArr(tasksDt);
    setViewThreeTask(tasksDt.slice(0, 3))
  }, [tasksDt]);

  /*Funcion de orden dnd para las listas: */

  const pushOrderData = async (newOrder) => {
    if (userId) {
      if (newOrder) {
        newOrder.map(async (task, i) => {
          const docRef = doc(
            db,
            "users",
            userId,
            "lists",
            idList,
            "tasks",
            task.taskId
          );
          await updateDoc(docRef, {
            order: i,
          });
        });
      }
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  const dragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    let newTasksOrder;

    setTaskDtArr(
      (prevTask) =>
        (newTasksOrder = reorder(prevTask, source.index, destination.index))
    );

    pushOrderData(newTasksOrder);
  };

  const toggleSettingList = () => {
    setSettingActive(!settingActive);
  };

  return (
    <div className={styles.TaskCardContainer}>
      {/********************************************
       *** *** Menu Flotante
       *******************************************/}
      <ListSettingMenu
        active={settingActive}
        deleteList={deleteLista}
        idList={idList}
        handleModal={toggleSettingList}
      />

      {/********************************************
       *** *** Contenido de la lista
       *******************************************/}

      {/******************
       **Titulo
       *****************/}

      <div className={styles.taskCardSection}>
        <div className={styles.titleListSection}>

          <h3
            className={styles.inputTextList}
          >{listName}</h3>
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
          {taskDtArr.length > 0 ? (
            viewThreeTask.map((task, i) => (

              <Task
                idTask={task.taskId}
                title={task.taskName}
                ifDone={task.done}
                idList={idList}
                key={task.taskId}
                deleteTask={deleteTask}
                numberTheme={numberTheme}
                idUser={userId}
                showDragDots={false}
                elementsColor={"white"}
              />

            ))
          ) : (
            <span
              style={{
                color: "white",
                fontSize: "14px",
                opacity: ".4",
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: "3px",
              }}
            >
              Your tasks will appear here{" "}
            </span>
          )}

          {/* Por Corregir el condicional*/}
        </div>


        {taskDtArr.length > 2 ?
          <span className={styles.AboutListBtn}>{taskDtArr.length - 3} elementos más en tu lista</span>
          : null}


      </div >
    </div >
  );
};

export default ListCard;
