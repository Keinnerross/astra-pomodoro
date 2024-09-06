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
import { IoIosAddCircle } from "react-icons/io";
import ModalAddList from "./components/addListFormComponents/modalAddList";
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
      <ModalAddList
        isActive={isActiveModalList}
        saveNewList={saveNewList}
        cancelList={handleModal}
      />

      <div className="flex justify-center">
        <div className="flex flex-col w-full">

          <div className="flex justify-between pt-[25px] ">

            <div >
              <h3 className="text-[22px] font-semibold">My lists</h3>
              <span className="text-[14px] md:text-[18px]">Define what you want to achieve</span>
            </div>

            {/* //Button that activates the modal for creating a List */}
            <div 
            className="cursor-pointer"
            onClick={() => handleModal()}>
              <IoIosAddCircle size={38} fill="#fff" />
            </div>



          </div >
          <div className="flex flex-col">
            <DragDropContext onDragEnd={dragEnd}>
              <Droppable droppableId="listArr"  >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    class="flex flex-col"

                  >
                    {lists.length > 0 ? (
                      lists.map((item, i) => (
                        <Draggable

                          key={item.id}
                          draggableId={item.id.toString()}
                          index={i}
                        >
                          {(provided) => (

                            <Fragment>


                              <div
                                className="my-[10px]"
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <div className="py-[7px] bg-blackSecundary rounded-t-[10px] "
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
                      <div className="flex items-center justify-center h-[200px] text-[18px]">
                        <h4 >
                          Your lists will appear here ⚔️
                        </h4>
                      </div>
                    )}
                    {provided.placeholder}

                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div >
    </Fragment >
  );
};

export default MainLists;
