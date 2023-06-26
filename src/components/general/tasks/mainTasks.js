import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  FC,
  forwardRef,
} from "react";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const MainTasks = ({ numberTheme }) => {
  const [lists, setLists] = useState([]);

  /* Functions Controllers List and Task */
  /*Listas: */

  /* Obtener Listas */
  const getData = async () => {
    const q = query(collection(db, "lists"), orderBy("order", "asc"));
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
    console.log(listsArr);
    setLists(listsArr);
  };

  /* Añadir lista*/
  const addList = async (values) => {
    try {
      const temporalID = uuidv4();

      const newList = {
        listName: values,
        order: 0,
        tasks: [],
        id: temporalID /*Id temporal para el correcto renderizado */,
      };

      /*Funcion para ordenar los valores de Orden de las listas */
      const newDataList = [newList, ...lists];

      const listOrderFn = newDataList.forEach((list, i) => {
        list.order = i;
      });

      setLists(newDataList);

      const dofRef = await addDoc(collection(db, "lists"), {
        listName: values,
        order: 0,
      });

      /* Funcion Order and Save Real ID*/

      const orderAndSaveID = newDataList.forEach((list, i) => {
        if (list.id == temporalID) {
          list.id = dofRef.id;
        } else {
          return;
        }
      });

      setLists(newDataList);
      pushOrderData(newDataList);
      getData();
      console.log("add or update success");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /* Actualizar Nombre de lista*/
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
    const confirmation = confirm("¿Estás seguro de eliminar esta lista?");

    if (confirmation) {
      const q = collection(db, "lists");
      const dc = doc(q, id);
      try {
        setLists((prevLists) => prevLists.filter((list) => list.id !== id));
        await deleteDoc(dc);

        console.log("List deleted successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  /*Las tareas se obtienen aquí, el resto de funciones de las tareas se encuentran en el componente de listas.*/

  /*Función Obtener Tareas: Esta función solo se llama desde la función principal getData */
  const getTasks = async (idList) => {
    try {
      const tasks = [];
      const q = query(
        collection(db, "lists", idList, "tasks"),
        orderBy("order", "asc")
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

  /*Funcion de orden dnd para las listas: */

  const pushOrderData = async (newOrder) => {
    if (newOrder) {
      await newOrder.map(async (list, i) => {
        const docRef = doc(db, "lists", list.id);
        await updateDoc(docRef, {
          order: i, //
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
    let newOrder;

    setLists(
      (prevListArr) =>
        (newOrder = reorder(prevListArr, source.index, destination.index))
    );

    pushOrderData(newOrder);
  };

  return (
    <div className={styles.mainTasksContainer}>
      <AddListCard addList={addList} numberTheme={numberTheme} />
      <div className={styles.listContainer}>
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId="listArr" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.listContainer}
                // onWheel={handleWheel} Por corregir
              >
                {lists.map((item, i) => (
                  <Draggable
                    className={styles.dragableItem}
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        className={styles.listSectionItem}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      >
                        <ListCard
                          key={item.id}
                          listName={item.listName}
                          idList={item.id}
                          tasksDt={item.tasks}
                          updateList={updateList}
                          deleteLista={deletelist}
                          data-id={item.id}
                          getData={getData}
                          numberTheme={numberTheme}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MainTasks;
