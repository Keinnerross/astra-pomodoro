import { useEffect, useState } from "react";
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

const ListCard = ({
  idList,
  listName,
  updateList,
  deleteLista,
  tasksDt,
  // addNewTaskProp,
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

  const altura = (Math.floor(Math.random() * 3) + 1) * 100;
  console.log(altura);

  return (
    <div
      className={styles.TaskCardContainer}
      style={{
        backgroundColor: configTheme.themeColor,
        margin: 6,
      }}
    >
      <ListSettingMenu
        active={settingActive}
        // deleteList={deleteLista(idList)}
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
          <p>settings</p>
        </button>
      </div>

      <div className={styles.taskListSection}>
        <div className={styles.addTaskSection}>
          <input
            className={styles.addTaskInput}
            style={{ color: configTheme.iconColor }}
            defaultValue="Add a Task"
            onChange={handleInputTask}
          />
          <button onClick={() => addNewTaskProp(idList, values)}></button>
        </div>

        {tasksDt
          ? tasksDt.map((task, i) => {
              return (
                <Task
                  style={{ color: configTheme.iconColor }}
                  idTask={task.taskId}
                  title={task.taskName}
                  ifDone={task.done}
                  idList={idList}
                  key={task.taskId}
                />
              );
            })
          : console.log("noapasaonaa")}
        {/* Por Corregir el condicional
         */}
      </div>
    </div>
  );
};

export default ListCard;
