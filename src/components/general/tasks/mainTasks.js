import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  FC,
  forwardRef,
  Fragment,
  useContext,
} from "react";
import { AppContext } from "@/Context/store";
import styles from "@/styles/componentes/general/tasks/mainTasks.module.css";
import ListCard from "./components/listCard";
import AddListCard from "./components/addListCard";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  update,
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
import UserLogin from "../user/login";
import { IoIosAddCircle } from "react-icons/io";
import ModalList from "./components/listsComponents/modalList";
import * as ListsServices from "@/components/general/tasks/components/listsComponents/listsServices/listsServices";



// Este es el documento principal donde se encuentran todas las listas y hay ciertas funciones desde las listas hacia abajo segun jerarquía.



const MainTasks = ({
  numberTheme,
  themeOpacity,
  bgTheme,
  ifUserLog,
  userId,

}) => {


  const { lists, setLists, userLog, idUserLog } = useContext(AppContext);
  const [ifModalAddTask, setIfModalAddtask] = useState(false)
  const [listSelect, setListSelect] = useState("")



  const fetchData = async () => {
    try {
      const lists = await ListsServices.newGetData();
      setLists(lists)
      console.log("ejecutao")
    } catch (error) {
    }
  };



  // fetchData
  useEffect(() => {
    fetchData();
  }, []);

  /*Funcion de orden dnd para las listas: */

  const pushOrderData = async (newOrder) => {
    try {
      if (newOrder) {
        if (ifUserLog) {
          await newOrder.map(async (list, i) => {
            const docRef = doc(db, "users", userId, "lists", list.id);
            await updateDoc(docRef, {
              order: i, //
            });
          });
        } else {
          const updatedArray = newOrder.map((list, i) => {
            return { ...list, order: i };
          });
          localStorage.setItem("lists", JSON.stringify(updatedArray));
        }
      }
    } catch (e) {
      console.log(e + "FAIL");
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



  // Este es el control de crear una lista desde el boton
  const handleModalList = async (listData) => {
    if (listData === false) {
      setIfModalAddtask(!ifModalAddTask)
      const idList = uuidv4();


      const newLists = await ListsServices.addList("", lists, userLog, idUserLog, idList)

      const newListAdd = newLists.find(item => item.id === idList);
      console.log(newListAdd);

      setListSelect(newListAdd)

      setLists(newLists)
    }

  }

  // Este es el control de ver una lista en el modal presionando la lista

  const verListaCreada = async (listData) => {
    setIfModalAddtask(!ifModalAddTask)

    setListSelect(listData ? listData : false)

  }
  const handleModalActiveList = () => {
    setIfModalAddtask(false)



  }



  const deleteRender = (idList) => {
    ListsServices.deleteList(idList, userLog, idUserLog)
    setLists((prevLists) => prevLists.filter((list) => list.id !== idList));
  }




  return (




    <Fragment>
      <ModalList
        isActive={ifModalAddTask}
        handleModal={handleModalActiveList}
        listSelect={listSelect}
        fetchData={fetchData}
      />


      <div className={styles.mainTasksContainer}>

        <div className={styles.mainTaskTitleSection}>

          <div className={styles.MainTaskGroupColumn}>
            <h3>My lists</h3>
            <span>Difine what you want to achive</span>
          </div>

          {/* // Botón que activa la creación de una Lista */}

          <div className={styles.addListBtnContainer} onClick={() => handleModalList(false)}>
            <IoIosAddCircle size={38} fill="#fff" />
          </div>



        </div>
        <div
          className={styles.mainTasksSection}
        >
          <div className={styles.listContainer}>
            {" "}
            {/*Contenedor que tiene el over y tamaño de la lista */}
            <DragDropContext onDragEnd={dragEnd}>
              <Droppable droppableId="listArr" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.listSection}

                  //Esto debería ser un carousel.
                  // style={
                  //   lists.length > 0
                  //     ? { overflowX: "scroll" }
                  //     : { overflow: "none" }
                  // }
                  // onWheel={handleWheel} Por corregir
                  >
                    {lists.length > 0 ? (
                      lists.map((item, i) => (
                        <Draggable
                          className={styles.dragableItem}
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={i}
                        >
                          {(provided) => (

                            <Fragment>


                              <div
                                className={styles.listSectionItem}
                                onClick={() => verListaCreada(item)}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <div className={styles.dragControlContainer}
                                  {...provided.dragHandleProps}
                                ></div>
                                <ListCard
                                  key={item.id}
                                  listName={item.listName}
                                  idList={item.id}
                                  tasksDt={item.tasks}
                                  deleteLista={deleteRender}
                                  data-id={item.id}
                                  getData={ListsServices.newGetData}
                                  numberTheme={numberTheme}
                                  themeOpacity={themeOpacity}
                                  userId={userId}
                                // newGetData={newGetData}
                                />
                              </div>
                            </Fragment>

                          )}
                        </Draggable>
                      ))
                    ) : (
                      <h4 className={styles.textListIfEmply}>
                        Your lists will appear here
                      </h4>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default MainTasks;
