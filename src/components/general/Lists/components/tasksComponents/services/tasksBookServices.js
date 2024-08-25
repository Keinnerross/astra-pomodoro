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
import { db } from "../../../../../../../firebase";
import { v4 as uuidv4 } from "uuid";
import * as ListsServices from "@/components/general/Lists/components/addListFormComponents/listsServices/listsServices";




/*Function that save order task when is drag and drop */

export const pushOrderData = async (newOrder, idUserLog, idList) => {
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
    } else {

        if (newOrder) {

            const lists = JSON.parse(localStorage.getItem("lists")) || [];

            const updateOrderTasks = newOrder.map((task, i) => {
                return { ...task, order: i };

            });
            console.log("updateOrderTasks ", updateOrderTasks)

            const updatedArray = lists.map((list) => {
                if (list.id === idList) {
                    return { ...list, tasks: updateOrderTasks };
                } else {
                    return list;
                }
            });
            console.log("updatedArray ", updatedArray)

            localStorage.setItem("lists", JSON.stringify(updatedArray));


        }

    }
};

/*Add New Task Function */

export const addNewTask = async (idList, idUserLog, newTask, newDataTask) => {

    try {



        // Esta es la verdadera petición Asincrona

        /*Guardar tareas en la db */
        if (idUserLog) {
            const listDoc = doc(db, "users", idUserLog, "lists", idList);
            const taskColl = collection(listDoc, "tasks");
            const taskDocRef = doc(taskColl, newTask.taskId);

            await setDoc(taskDocRef, {
                taskName: newTask.taskName,
                done: false,
                order: 0,
            });

            pushOrderData(newDataTask, idUserLog, idList);
        } else {

            const storedArray = JSON.parse(localStorage.getItem("lists")) || [];

            const updatedArray = storedArray.map((list) => {
                if (list.id === idList) {
                    return { ...list, tasks: newDataTask };
                } else {
                    return list;
                }
            });


            localStorage.setItem("lists", JSON.stringify(updatedArray));
            ListsServices.newGetData()
        }


    } catch (e) {
        console.log("Algo salió mal", e);
    }
};


/*Update Name Task Function */

export const updateNameTask = async (idUserLog, idList, idTask, newTaskName) => {
    try {
        if (idUserLog) {
            const task = doc(db, "users", idUserLog, "lists", idList, "tasks", idTask);
            await updateDoc(task, {
                taskName: newTaskName,
            });

        } else {
            const storedArray = JSON.parse(localStorage.getItem("lists"));
            let tasksArr;

            storedArray.forEach((list) => {
                if (list.id === idList) {
                    tasksArr = list.tasks;
                }
            });


            const updateTasks = tasksArr.map((task, i) => {
                if (task.taskId === idTask) {

                    return { ...task, taskName: newTaskName };
                } else {
                    return task;
                }
            });


            const newListWithTaskUpdate = storedArray.map((list) => {
                if (list.id === idList) {

                    return { ...list, tasks: updateTasks };
                } else {
                    return list;
                }
            });
            localStorage.setItem("lists", JSON.stringify(newListWithTaskUpdate));
        }
    } catch (e) {
        console.log("error:", e);
    }
};

/*Update Check Task Function */

export const updateCheckTask = async (idUser, idList, idTask, check) => {
    if (idUser) {
        //DB SAVE

        const task = doc(db, "users", idUser, "lists", idList, "tasks", idTask);
        await updateDoc(task, {
            done: check,
        });
        console.log("Guardado!")
    } else {
        //LOCAL SAVE
        const storedArray = JSON.parse(localStorage.getItem("lists"));

        let tasksArr;
        storedArray.forEach((list) => {
            if (list.id === idList) {
                tasksArr = list.tasks;
            }
        });


        const updateTasks = tasksArr.map((task) => {
            if (task.taskId === idTask) {
                return { ...task, done: check };
            } else {
                return task;
            }
        });


        const newListWithCheckUpdate = storedArray.map((list) => {
            if (list.id === idList) {

                return { ...list, tasks: updateTasks };
            } else {
                return list;
            }
        });
        localStorage.setItem("lists", JSON.stringify(newListWithCheckUpdate));
    }
}


/*Delete Task Function */

export const deleteTask = async (idUserLog, idList, idTask, newTaskArray) => {
    try {
        if (idUserLog) {
            //DB SAVE
            const task = doc(db, "users", idUserLog, "lists", idList, "tasks", idTask);
            await deleteDoc(task);
        } else {
            //LOCAL SAVE
            const storedArray = JSON.parse(localStorage.getItem("lists"));

            const newTaskList = storedArray.map((list) => {
                if (list.id === idList) {

                    return { ...list, tasks: newTaskArray };
                } else {
                    return list;
                }
            });
            localStorage.setItem("lists", JSON.stringify(newTaskList));
        }
    } catch (e) {
        console.log(e);
    }

};