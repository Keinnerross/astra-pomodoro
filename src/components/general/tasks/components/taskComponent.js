import styles from "@/styles/componentes/general/tasks/components/taskComponent.module.css";

import { themes } from "../../userTemplates/mainUserTemplates";
import { db } from "../../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";

const Task = ({ title, ifDone, idTask, idList, deleteTask, numberTheme }) => {
  const themeSelect = themes(1)[numberTheme];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
  };
  /*Los temas estan puestos aqui para poder testear los estilos, sin embargo hay que ponerlos de forma atomatica relacionadose con la sidebar */
  /**Funcion para actualizar el Nombre de una tarea */

  /*Funcion para acutalizar nombre de la tarea */
  const updateName = async (idList, idTarea, newTaskName) => {
    try {
      const task = doc(db, "lists", idList, "tasks", idTarea);
      await updateDoc(task, {
        taskName: newTaskName,
      });
    } catch (e) {
      console.log("error:", e, idList, idTask);
    }
  };
  /*Funcion para manejar el valor del input de la tarea, su titulo. */
  const handleInputName = (e) => {
    const { value } = e.target;
    updateName(idList, idTask, value);
  };

  /**Funcion para actualizar el completado de la tarea */

  const [check, setCheck] = useState(ifDone);

  const handleCheck = async (idLista, idTarea) => {
    try {
      check ? setCheck(false) : setCheck(true);

      const task = doc(db, "lists", idLista, "tasks", idTarea);
      await updateDoc(task, {
        done: !check,
      });
    } catch (e) {}
  };

  /* Funcion para el chek de completado, ((((no implementado ))))*/

  return (
    <div className={styles.taskContainer}>
      <div className={styles.taskTitleSection}>
        <div className={styles.dragButtonContainer}>
          <MdDragIndicator
            className={styles.dragButton}
            fill={configTheme.iconColor}
            size={15}
          />
        </div>
        <input
          type="checkbox"
          style={{ marginRight: 5, backgroundColor: "white" }}
          checked={check}
          onChange={() => handleCheck(idList, idTask)}
        />
        <input
          className={styles.inputTitleTask}
          style={{ color: configTheme.iconColor }}
          defaultValue={title}
          onChange={handleInputName}
        />
      </div>
      <span
        className={styles.deleteTaskBtn}
        style={{ color: configTheme.iconColor }}
        onClick={() => deleteTask(idList, idTask)}
      >
        x
      </span>

      {/* Este es el que causa el cambio de los margenes cuando se hace hover sobre la tarjeta de la tarea */}
    </div>
  );
};

export default Task;
