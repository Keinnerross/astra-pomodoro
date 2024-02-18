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








/****************/
/*Add New Task */
/**************/

export const addNewTask = async (idList, tasksName) => {
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
        if (userId) {
            const listDoc = doc(db, "users", userId, "lists", idList);
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
            newGetData();
        }
    } catch (e) {
        console.log("Algo salió mal", e);
    }
};