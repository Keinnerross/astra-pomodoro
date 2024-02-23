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
import {
    onAuthStateChanged, //*Esto identifica si la autentificacion ha cambiado.//
} from "firebase/auth";
import { auth } from "../../../../../../../firebase";
import { v4 as uuidv4 } from "uuid";



/*Funcion para Obtener Listas */



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

export const newGetData = async () => {

    return new Promise((resolve, reject) => {
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
                        tasksData.sort((a, b) => (a.order > b.order ? 1 : -1));
                        listsArr.push({ ...doc.data(), id: doc.id, tasks: tasksData });
                        listsArr.sort((a, b) => (a.order > b.order ? 1 : -1));
                    })
                );
                resolve(listsArr);
            } else {
                const storedArray = JSON.parse(localStorage.getItem("lists")) || [];
                let listsArr = [];
                storedArray.map((doc) => {
                    listsArr.push({ ...doc, id: doc.id, tasks: doc.tasks });
                });
                resolve(listsArr);

            }
        })
    })
};



/*Función Borrar lista */

export const deleteList = async (id, ifUserLog, userId) => {
    const confirmation = confirm("¿Estás seguro de eliminar esta lista?");

    if (confirmation) {
        try {
            if (ifUserLog) {
                const dc = doc(db, "users", userId, "lists", id);
                await deleteDoc(dc);
            } else {
                const storedArray = JSON.parse(localStorage.getItem("lists")) || [];
                const updateArray = storedArray.filter((lists) => lists.id !== id);
                localStorage.setItem("lists", JSON.stringify(updateArray));

            }
        } catch (err) {
            console.log(err);
        }
    } else {
        return;
    }
};


/* Actualizar Nombre de lista*/
export const updateList = async (userId, newNameList, idList) => {
    try {
        const docRef = doc(db, "users", userId, "lists", idList);
        await updateDoc(docRef, {
            listName: newNameList, // Agregamos la tarea a la lista
        });
        alert("xd")
    } catch (e) {
        console.log("Algo salió mal", e);
    }
};




/*Ordenar lista Guardado DB
 */
const pushOrderData = async (newOrder, ifUserLog) => {
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

/*Creación de Lista */
export const addList = async (values, lists, ifUserLog) => {
    try {
        /*Este condicional es temporal, lo ideal sería dividir en guardado un para la base de datos y el otro desde el frente con localStorage*/

        const idList = uuidv4();

        const newList = {
            listName: values,
            order: 0,
            tasks: [],
            id: idList /*Id*/,
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
        // setLists(newOrder);

        /*Retorno de la */

        /*Guardado en la DB */
        if (ifUserLog) {
            const docRef = doc(db, "users", userId);
            const listColl = collection(docRef, "lists");
            const listDocRef = doc(listColl, idList);

            await setDoc(listDocRef, {
                listName: values,
                order: 0,
                tasks: [],
            });
            pushOrderData(newOrder, ifUserLog);
        } else {
            /*LocalStorage */
            const existingArray = JSON.parse(localStorage.getItem("lists")) || [];
            existingArray.push(newList);

            localStorage.setItem("lists", JSON.stringify(existingArray));
            pushOrderData(newOrder);

        }
        return newOrder

    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
