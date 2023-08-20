import { useEffect, useState, useRef } from "react";
import styles from "@/styles/componentes/general/tasks/components/listCard.module.css";
import { themes } from "../../userTemplates/mainUserTemplates";

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
  const themeSelect = themes(themeOpacity)[numberTheme];
  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
  };
  /*Los temas estan puestos aqui para poder testear los estilos, sin embargo hay que ponerlos de forma atomatica relacionadose con la sidebar */

  /*Controles de lista y tareas */

  const [values, setValues] = useState("");

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

  /*Funcion de input del titulo de la Tarea */
  const handleInputTask = (e) => {
    const { value } = e.target;
    setValues(value);
  };

  /*Función Agregar nueva tarea. */
  const addNewTask = async (idList, tasksName) => {
    try {
      const taskId = uuidv4();

      const newTask = {
        taskName: tasksName,
        done: false,
        order: 0,
        taskId: taskId,
      };

      const newDataTask = [...taskDtArr, newTask];
      const newOrder = [];

      newDataTask.forEach((list, i) => {
        list.order = i;
        newOrder.push(list);
      });

      /*Renderizado desde el Frente */
      setTaskDtArr(newOrder);
      /*Guardar tareas en la db */
      if (userId) {
        const listDoc = doc(db, "users", userId, "lists", idList);
        const taskColl = collection(listDoc, "tasks");
        const taskDocRef = doc(taskColl, taskId);

        await setDoc(taskDocRef, {
          taskName: tasksName,
          done: false,
          order: 0,
        });

        pushOrderData(newDataTask);
      } else {
        const storedArray = JSON.parse(localStorage.getItem("lists")) || [];
        const updatedArray = storedArray.map((list) => {
          if (list.id === idList) {
            return { ...list, tasks: newOrder };
          } else {
            return list;
          }
        });
        localStorage.setItem("lists", JSON.stringify(updatedArray));
        newGetData();
      }
    } catch (e) {
      console.log("Algo salió mal", e);
    }
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

  useEffect(() => {
    setTaskDtArr(tasksDt);
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

  const hightValue = `${34 * taskDtArr.length}px`;

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
    <div
      className={styles.TaskCardContainer}
      style={{
        backgroundColor: configTheme.themeColor,
      }}
    >
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              inputTitleList.current.blur();
            }}
          >
            <input
              className={styles.inputTextList}
              style={{ color: configTheme.iconColor }}
              defaultValue={listName} /*Por corregir */
              ref={inputTitleList}
              onChange={handleInputChange}
            />
          </form>
          <button
            className={styles.dotSettingButton}
            onClick={() => toggleSettingList()}
          >
            <BsThreeDotsVertical fill={themeSelect.iconColor} />
          </button>
        </div>

        {/******************
         **Tareas
         *****************/}

        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId="tasksArr">
            {(provided) => (
              <div
                className={styles.taskRenderContainer}
                style={{ height: hightValue }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {taskDtArr.length > 0 ? (
                  taskDtArr.map((task, i) => (
                    <Draggable
                      key={task.taskId}
                      draggableId={task.taskId}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          className={styles.taskRenderSection}
                          /*DIV SIN STYLOS*/
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            style={{ color: configTheme.iconColor }}
                            idTask={task.taskId}
                            title={task.taskName}
                            ifDone={task.done}
                            idList={idList}
                            key={task.taskId}
                            deleteTask={deleteTask}
                            numberTheme={numberTheme}
                            idUser={userId}
                          />
                        </div>
                      )}
                    </Draggable>
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
            )}
          </Droppable>
        </DragDropContext>

        {/******************
         **Seccion para añadir nueva Tarea
         *****************/}
        <div className={styles.addTaskSection}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask(idList, values);
              inputAddTaskRef.current.value = "";
            }}
          >
            <input
              className={styles.addTaskInput}
              style={{ color: configTheme.iconColor }}
              placeholder="+ Add new task"
              onChange={handleInputTask}
              ref={inputAddTaskRef}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
