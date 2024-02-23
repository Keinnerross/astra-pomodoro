import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../taskComponent";
import { useEffect, useState, useContext, Fragment } from "react";
import { AppContext } from "@/Context/store"
import AddTask from "./AddTask";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../../../firebase";
import {
    doc,
    setDoc,
    collection,
    updateDoc,
} from "firebase/firestore";
import * as ListsServices from "@/components/general/tasks/components/listsComponents/listsServices/listsServices";


const DragTasks = ({ taskDataArray, idList }) => {

    const [taskDtArr, setTaskDtArr] = useState([]);
    const { idUserLog } = useContext(AppContext);

    const pushOrderData = async (newOrder) => {
        if (idUserLog) {
            if (newOrder) {
                newOrder.map(async (task, i) => {
                    const docRef = doc(
                        db,
                        "users",
                        idUserLog,
                        "lists",
                        idList,
                        "tasks",
                        task.taskId
                    );
                    await updateDoc(docRef, {
                        order: i,
                    });
                });
            }
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


    useEffect(() => {
        setTaskDtArr(taskDataArray)
    }, [taskDataArray])




    const addNewTask = async (idList, tasksName) => {
        try {
            const taskId = uuidv4();

            const newTask = {
                taskName: tasksName,
                done: false,
                order: 0,
                taskId: taskId,
            };

            const newDataTask = [...taskDtArr, newTask];
            const newOrder = [];

            newDataTask.forEach((list, i) => {
                list.order = i;
                newOrder.push(list);
            });

            /*Renderizado desde el Frente */
            setTaskDtArr(newOrder);

            /*Guardar tareas en la db */
            if (idUserLog) {
                const listDoc = doc(db, "users", idUserLog, "lists", idList);
                const taskColl = collection(listDoc, "tasks");
                const taskDocRef = doc(taskColl, taskId);

                await setDoc(taskDocRef, {
                    taskName: tasksName,
                    done: false,
                    order: 0,
                });

                pushOrderData(newDataTask);
            } else {
                const storedArray = JSON.parse(localStorage.getItem("lists")) || [];
                const updatedArray = storedArray.map((list) => {
                    if (list.id === idList) {
                        return { ...list, tasks: newOrder };
                    } else {
                        return list;
                    }
                });
                localStorage.setItem("lists", JSON.stringify(updatedArray));
                ListsServices.newGetData();
            }
        } catch (e) {
            console.log("Algo salió mal", e);
        }
    };



    return (
        <Fragment>
            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId="tasksArr">
                    {(provided) => (
                        <div
                            // className={styles.taskRenderContainer}
                            // style={{ height: hightValue }}F
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {

                                taskDtArr.length >= 1 ? (

                                    taskDtArr.map((task, i) => (
                                        <Draggable
                                            key={task.taskId}
                                            draggableId={task.taskId}
                                            index={i}
                                        >
                                            {(provided) => (
                                                <div
                                                    // className={styles.taskRenderSection}
                                                    /*DIV SIN STYLOS*/
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Task
                                                        style={{ color: "#fff" }}
                                                        idTask={task.taskId}
                                                        title={task.taskName}
                                                        ifDone={task.done}
                                                        idList={idList}
                                                        key={task.taskId}
                                                        // deleteTask={deleteTask} Funcion para eliminar tarea
                                                        // numberTheme={numberTheme} Esto se debe eliminar
                                                        idUser={idUserLog}
                                                        showDragDots={true}
                                                    />

                                                </div>

                                            )}

                                        </Draggable>

                                    ))


                                )
                                    : null
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext >
            <AddTask idList={idList} addNewTask={addNewTask} />
        </Fragment>)
}

export default DragTasks;