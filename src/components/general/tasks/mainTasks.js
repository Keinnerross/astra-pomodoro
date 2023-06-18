import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "@/styles/componentes/general/tasks/mainTasks.module.css";
import ListCard from "./components/listCard";
import AddListCard from "./components/addListCard";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../../firebase";

const MainTasks = () => {
  const [lists, setLists] = useState([]);

  /* Functions Controllers List and Task */

  /* Añadir lista */
  const addList = async (values) => {
    try {
      const orderValue = lists.length + 1;

      console.log();
      await addDoc(collection(db, "lists"), {
        listName: values,
        order: orderValue,
      });
      getData();
      // console.log(newListsArr);
      console.log("add or update success");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /* Obtener Listas */
  const getData = async () => {
    const q = query(collection(db, "lists"), orderBy("order", "desc"));
    const querySnapshot = await getDocs(q);
    const listsArr = [];

    /*Aqui hay una cuestion curiosa, modificando esta funcion de forma que obtenga los datos una sola vez y maneje la informacion desde el frente para que no se rerenderice, lo hice usando Primise.All de esta forma, cosa que se creara un array con todos los valores de las tareas vinculados a las listas y luego de obtener todo en un array (ver constante tasksPromise) poderlo actualizar en el estado y hacerlo llegar al componente de las listas gracias a los props.  */

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const tasks = await getTasks(doc.id);
        const tasksPromise = Array.isArray(tasks) ? tasks : [tasks];
        const tasksData = await Promise.all(tasksPromise);
        listsArr.push({ ...doc.data(), id: doc.id, tasks: tasksData });
      })
    );

    setLists(listsArr);
  };

  /* Actualizar Lista */
  const updateList = useCallback(async (newNameList, idList) => {
    try {
      const docRef = doc(db, "lists", idList);
      await updateDoc(docRef, {
        listName: newNameList, // Agregamos la tarea a la lista
      });
    } catch (e) {
      console.log("Algo salió mal", e);
    }
  });

  /*Función Borrar lista */

  const deletelist = useCallback(async (id) => {
    const q = collection(db, "lists");
    const docu = doc(q, id);
    try {
      setLists((prevLists) => prevLists.filter((list) => list.id !== id));
      await deleteDoc(docu);

      console.log("List deleted successfully");
    } catch (err) {
      console.log(err);
    }
  });

  /*Función Agregar nueva tarea. */
  const addNewTask = async (idList, tasksName) => {
    try {
      const tasks = await getTasks(idList);
      const orderValue = tasks.length + 1;
      console.log(orderValue);
      const newTask = {
        taskName: tasksName,
        done: false,
        order: orderValue,
      };
      console.log(idList);
      const docRef = doc(db, "lists", idList);
      const tasksColl = collection(docRef, "tasks");
      await addDoc(tasksColl, newTask);
      console.log(`${newTask} se ha enviado con éxito`);
      getData();
    } catch (e) {
      console.log("Algo salió mal", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /*Las tareas se obtienen aquí, el resto de funciones de las tareas se encuentran en el componente de listas.*/
  /*Función Obtener Tareas */
  const getTasks = async (idList) => {
    try {
      const tasks = [];
      const q = query(
        collection(db, "lists", idList, "tasks"),
        orderBy("order", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => {
        tasks.push({ ...doc.data(), taskId: doc.id });
      });
      return tasks;
    } catch (e) {
      console.log(e);
    }
  };

  console.log(lists);

  return (
    <div className={styles.mainTasksContainer}>
      <AddListCard addList={addList} />
      <div className={styles.some}>
        <div
          style={{
            maxWidth: 1150,
            height: "auto",
            maxHeight: 340,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {lists.map((item) => (
            <ListCard
              key={item.id}
              listName={item.listName}
              idList={item.id}
              tasksDt={item.tasks}
              updateList={updateList}
              addNewTaskProp={addNewTask}
              data-id={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainTasks;
