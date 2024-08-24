import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../taskComponent";
import { useEffect, useState, useContext, Fragment } from "react";
import { AppContext } from "@/Context/store"
import AddTask from "./AddTask";
import { v4 as uuidv4 } from "uuid";
import * as TaskServices from "@/components/general/tasks/components/tasksComponents/services/tasksBookServices";






// Este archivo contiene toda la logica de las tareas, su función para agregar una, la funcion para ordenarla entre las listas cuando se hace drag and drop y otras funciones más. se vincula a travez de props con el archivo addTask.js que es el que maneja el formulario y dispara ciertas funciones como la de agregar una tarea.

// De igual forma retorna las tareas existentes dentro de la lista que se está consultando.



const DragTasks = ({ isActive, taskDataArray, idList }) => {


    // taskDataArray es la info de las tareas que se obtiene desde las listas
    // taskDtArr es un estado que en un principio se actualiza con la info del seridor es decir de taskDataArray


    const [taskDtArr, setTaskDtArr] = useState([]);
    const { idUserLog } = useContext(AppContext);



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

        TaskServices.pushOrderData(newTasksOrder, idUserLog, idList);
    };


    useEffect(() => {
        if (taskDataArray === undefined || taskDataArray.length === 0) {
            setTaskDtArr([]);
        } else {
            setTaskDtArr(taskDataArray);
        }
    }, [taskDataArray]);


    console.log(taskDataArray, taskDtArr, isActive);


    const addNewTask = async (idList, value) => {
        try {


            // Esto se hace desde el frente y no espera ninguna petición.
            const taskId = uuidv4();

            const newTask = {
                taskName: value,
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
            setTaskDtArr(newOrder);
            await TaskServices.addNewTask(idList, idUserLog, newTask, newDataTask);


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <AddTask idList={idList} addNewTask={addNewTask} />

            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId="tasksArr">
                    {(provided) => (
                        <div

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
        </Fragment>)
}

export default DragTasks;