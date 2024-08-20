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





/****************/
/*Función ordenar tareas */
/**************/

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
    }
};





/****************/
/*Add New Task */
/**************/

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
                    return { ...list, tasks: newOrder };
                } else {
                    return list;
                }
            });
            localStorage.setItem("lists", JSON.stringify(updatedArray));
            newGetData();
        }


    } catch (e) {
        console.log("Algo salió mal", e);
    }
};


