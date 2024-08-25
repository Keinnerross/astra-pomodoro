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
import UserLogin from "../user/login";
import { IoIosAddCircle } from "react-icons/io";
import ModalList from "./components/addListFormComponents/modalAddList";
import * as ListsServices from "@/components/general/Lists/components/addListFormComponents/listsServices/listsServices";



// Este es el documento principal donde se encuentran todas las listas y hay ciertas funciones desde las listas hacia abajo segun jerarquía.



const MainLists = ({

  ifUserLog,
  userId,

}) => {


  const { lists, setLists, userLog, idUserLog } = useContext(AppContext);
  const [isActiveModalList, setIsActiveModalList] = useState(false)



  const fetchData = async () => {
    try {
      const lists = await ListsServices.newGetData();
      setLists(lists)
      console.log("fechDta")
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

  const dragEnd = async (result) => {
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

    console.log(lists)
    setLists(
      (prevListArr) =>
        (newOrder = reorder(prevListArr, source.index, destination.index))
    );
    pushOrderData(newOrder);
  };





  const handleModal = () => {

    setIsActiveModalList(!isActiveModalList)

  }

  const saveNewList = async (newList, tasksList) => {

    setIsActiveModalList(!isActiveModalList)
    setLists((prev) => [newList, ...prev]);

    await ListsServices.addNewList(newList, lists, tasksList, ifUserLog, userId);

  }










  const deleteRender = async (idList) => {
    const confirmation = confirm("¿Estás seguro de eliminar esta lista?");

    if (confirmation === true) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== idList));
      await ListsServices.deleteList(idList, userLog, idUserLog)
    } else {
      return
    }
  }




  return (




    <Fragment>
      <ModalList
        isActive={isActiveModalList}
        saveNewList={saveNewList}
        fetchData={fetchData}
      />


      <div className={styles.mainTasksContainer}>

        <div className={styles.mainTaskTitleSection}>

          <div className={styles.MainTaskGroupColumn}>
            <h3>My lists</h3>
            <span>Difine what you want to achive</span>
          </div>

          {/* //Button that activates the modal for creating a List */}
          <div className={styles.addListBtnContainer} onClick={() => handleModal()}>
            <IoIosAddCircle size={38} fill="#fff" />
          </div>



        </div>
        <div className={styles.mainTasksSection}>
          <div className={styles.listContainer}>
            {/*Contenedor que tiene el over y tamaño de la lista */}
            <DragDropContext onDragEnd={dragEnd}>
              <Droppable droppableId="listArr" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.listSection}

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
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <div className={styles.dragControlContainer}
                                  {...provided.dragHandleProps}
                                ></div>
                                <ListCard
                                  key={item.id}
                                  listObj={item}
                                  deleteLista={deleteRender}
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

export default MainLists;
