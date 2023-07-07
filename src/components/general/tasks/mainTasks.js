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
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  onAuthStateChanged, //*Esto identifica si la autentificacion ha cambiado.//
} from "firebase/auth";
import { auth } from "../../../../firebase";

const MainTasks = ({
  numberTheme,
  themeOpacity,
  bgTheme,
  ifUserLog,
  userId,
}) => {
  const [lists, setLists] = useState([]);
  /* Functions Controllers List and Task */
  /*Listas: */

  /* Obtener Listas */

  const newGetData = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const listsArr = [];

        const docRef = doc(db, "users", user.uid);
        const listColl = collection(docRef, "lists");
        const querySnapshot = await getDocs(listColl);
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const tasks = await getTasks(doc.id, user.uid);

            const tasksPromise = Array.isArray(tasks) ? tasks : [tasks];
            const tasksData = await Promise.all(tasksPromise);
            listsArr.push({ ...doc.data(), id: doc.id, tasks: tasksData });
          })
        );
        setLists(listsArr);
      }
    });
  };

  /*Creación de Lista */
  const addList = async (values) => {
    try {
      /*Este condicional es temporal, lo ideal sería dividir en guardado un para la base de datos y el otro desde el frente con localStorage*/
      if (ifUserLog) {
        const idList = uuidv4();

        const newList = {
          listName: values,
          order: 0,
          tasks: [],
          id: idList /*Id temporal para el correcto renderizado */,
        };

        /*Funcion para ordenar los valores de Orden de las listas */
        const newDataList = [newList, ...lists];

        const newOrder = [];
        /*ordenar Posiciones */
        newDataList.forEach((list, i) => {
          list.order = i;
          newOrder.push(list);
        });

        /*Render Front */
        setLists(newOrder);

        const docRef = doc(db, "users", userId);
        const listColl = collection(docRef, "lists");
        const listDocRef = doc(listColl, idList);

        await setDoc(listDocRef, {
          listName: values,
          order: 0,
          tasks: [],
        });

        pushOrderData(newOrder);
        /*Funcion a Ordenar igual agregando los usuarios*/
        console.log("add or update success");
      } else {
        alert("Necesitas estar logeado para crear una Lista");

        /*Envío de Lista. */

        /*Si Existe un Usuario */

        /*Esto lo hacemos de esta forma ya que Firestore solo recibe dos parametros en Doc() Ver DocRef */
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /* Actualizar Nombre de lista*/
  const updateList = useCallback(async (newNameList, idList) => {
    try {
      const docRef = doc(db, "users", userId, "lists", idList);
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
      const dc = doc(db, "users", userId, "lists", id);

      // const q = collection(db, "lists");
      // const dc = doc(q, id);
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
    newGetData();
  }, []);

  /*Las tareas se obtienen aquí, el resto de funciones de las tareas se encuentran en el componente de listas.*/

  /*Función Obtener Tareas: Esta función solo se llama desde la función principal getData */
  const getTasks = async (idList, idUser) => {
    try {
      const tasks = [];

      const listDocRef = doc(db, "users", idUser, "lists", idList);
      const taskCollectionRef = collection(listDocRef, "tasks");
      const querySnapshot = await getDocs(taskCollectionRef);

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
        const docRef = doc(db, "users", userId, "lists", list.id);
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
      <AddListCard
        addList={addList}
        numberTheme={numberTheme}
        themeOpacity={themeOpacity}
      />
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
                      >
                        <div
                          style={{
                            background: bgTheme,
                          }}
                          className={styles.dragControlContainer}
                          {...provided.dragHandleProps}
                        ></div>
                        <ListCard
                          key={item.id}
                          listName={item.listName}
                          idList={item.id}
                          tasksDt={item.tasks}
                          updateList={updateList}
                          deleteLista={deletelist}
                          data-id={item.id}
                          getData={newGetData}
                          numberTheme={numberTheme}
                          themeOpacity={themeOpacity}
                          userId={userId}
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
