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
  getData,
  numberTheme,
  themeOpacity,
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

  /*Funcion de input del titulo actualizacion del nombre de la lista */
  const handleInputChange = (e) => {
    const { value } = e.target;
    updateList(value, idList);
  };

  /*Funcion de input del titulo de la Tarea */
  const handleInputTask = (e) => {
    const { value } = e.target;
    console.log(value);
    setValues(value);
  };

  /*Función Agregar nueva tarea. */
  const addNewTask = async (idList, tasksName) => {
    try {
      const temporalID = uuidv4();

      const newTask = {
        taskName: tasksName,
        done: false,
        order: 0,
        taskId:
          temporalID /*Este es un ID Temporar para poder renderizar correctamente */,
      };

      const newDataTask = [newTask, ...taskDtArr];

      const listOrderFn = newDataTask.forEach((list, i) => {
        list.order = i;
      });

      setTaskDtArr(newDataTask);

      const docRef = doc(db, "lists", idList);
      const tasksColl = collection(docRef, "tasks");
      const newTaskUpdate = await addDoc(tasksColl, {
        taskName: tasksName,
        done: false,
        order: 0,
      });
      console.log(newTaskUpdate.id);

      newDataTask.forEach((task, i) => {
        if (task.taskId == temporalID) {
          task.taskId = newTaskUpdate.id;
        } else {
          return;
        }
      });

      setTaskDtArr(newDataTask);
      pushOrderData(newDataTask);
      getData();

      console.log("Tarea agregada con exito");
    } catch (e) {
      console.log("Algo salió mal", e);
    }
  };

  /*Funcion para eliminar una tarea */

  const deleteTask = async (idList, idTask) => {
    const confirmation = confirm("Estas seguro de eliminar esta tarea?");
    if (confirmation) {
      try {
        const docRef = doc(db, "lists", idList, "tasks", idTask);
        const newlistTasks = taskDtArr.filter(
          (tasks) => tasks.taskId !== idTask
        );
        setTaskDtArr(newlistTasks);
        await deleteDoc(docRef);
        console.log("Eliminado Sadisfactoriamente");
      } catch (e) {
        alert("Hubo un problema en eliminar");
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
    if (newOrder) {
      newOrder.map(async (task, i) => {
        const docRef = doc(db, "lists", idList, "tasks", task.taskId);
        await updateDoc(docRef, {
          order: i,
        });
      });
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

  return (
    <div
      className={styles.TaskCardContainer}
      style={{
        backgroundColor: configTheme.themeColor,
      }}
    >
      <ListSettingMenu
        active={settingActive}
        deleteList={deleteLista}
        idList={idList}
      />

      <div className={styles.titleListSection}>
        <input
          className={styles.inputTextList}
          style={{ color: configTheme.iconColor }}
          defaultValue={listName} /*Por corregir */
          onChange={handleInputChange}
        />

        <button
          className={styles.dotSettingButton}
          onClick={() => setSettingActive(!settingActive)}
        >
          <BsThreeDotsVertical fill={themeSelect.iconColor} />
        </button>
      </div>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId="tasksArr">
          {(provided) => (
            <div
              className={styles.taskListSectionForm}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {taskDtArr
                ? taskDtArr.map((task, i) => (
                    <Draggable
                      key={task.taskId}
                      draggableId={task.taskId}
                      index={i}
                    >
                      {(provided) => (
                        <div
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
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : console.log("noapasaonaa")}

              {/* Por Corregir el condicional*/}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <form
        className={styles.addTaskSection}
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
  );
};

export default ListCard;
