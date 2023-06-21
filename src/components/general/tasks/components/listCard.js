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

const ListCard = ({
  idList,
  listName,
  updateList,
  deleteLista,
  tasksDt,
  addNewTaskProp,
}) => {
  /*Configuracion Theme */
  const themeSelect = themes[1];
  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
  };
  /*Los temas estan puestos aqui para poder testear los estilos, sin embargo hay que ponerlos de forma atomatica relacionadose con la sidebar */

  /*Controles de lista y tareas */

  const [values, setValues] = useState("");
  const [tasks, setTasks] = useState([]);
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
  // ESTAMOS EL PRUEBAAAA!!!!!!!!!!!!!!!!!

  // /*Función Obtener Tareas */
  // const getTasks = async (idList) => {
  //   try {
  //     const tasks = [];
  //     const q = query(
  //       collection(db, "lists", idList, "tasks"),
  //       orderBy("order", "desc")
  //     );

  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.docs.map((doc) => {
  //       tasks.push({ ...doc.data(), taskId: doc.id });
  //     });
  //     setTasks(tasks);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // ESTAMOS EN PRUEBAAAA!!!!!!!!!!!!!!!!

  // Funciones para el dnd de las tareas /

  const [taskDtArr, setTaskDtArr] = useState([]);
  useEffect(() => {
    setTaskDtArr(tasksDt);
  }, [tasksDt]);

  console.log(taskDtArr);

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
    setTaskDtArr((prevTaskArr) =>
      reorder(prevTaskArr, source.index, destination.index)
    );
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

        <button onClick={() => setSettingActive(!settingActive)}>
          <BsThreeDotsVertical />
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
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : console.log("noapasaonaa")}

              {/* Por Corregir el condicional*/}
              <form
                className={styles.addTaskSection}
                onSubmit={(e) => {
                  e.preventDefault();
                  addNewTaskProp(idList, values);
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
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ListCard;
