import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './taskComponent';
import { useEffect, useState, useContext, Fragment } from 'react';
import { AppContext } from '@/Context/store'
import AddTask from './AddTask';
import { v4 as uuidv4 } from 'uuid';
import * as TaskServices from '@/components/general/Lists/components/tasksComponents/services/tasksBookServices';






// Este archivo contiene toda la logica de las tareas, su función para agregar una, la funcion para ordenarla entre las listas cuando se hace drag and drop y otras funciones más. se vincula a travez de props con el archivo addTask.js que es el que maneja el formulario y dispara ciertas funciones como la de agregar una tarea.

// De igual forma retorna las tareas existentes dentro de la lista que se está consultando.



const DragTasks = ({ idList, taskDtArr, handleTaskListChange, isAccordionActive, isModal }) => {


    // taskDataArray es la info de las tareas que se obtiene desde las listas
    // taskDtArr es un estado que en un principio se actualiza con la info del seridor es decir de taskDataArray


    const { lists, setLists, userLog, idUserLog } = useContext(AppContext);


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
        newTasksOrder = reorder(taskDtArr, source.index, destination.index)
        console.log(newTasksOrder);

        handleTaskListChange(newTasksOrder);
        console.log(idList)
        if (idList) {
            TaskServices.pushOrderData(newTasksOrder, idUserLog, idList);

        }


    };






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

            handleTaskListChange(newOrder);

            if (idList) {
                await TaskServices.addNewTask(idList, idUserLog, newTask, newDataTask);

            }




        } catch (error) {
            console.log(error)
        }
    }

    const handleCheck = async (idUser, idList, idTask, check) => {
        try {
            const newTaskArray = taskDtArr.map((task) => {
                if (task.taskId === idTask) {
                    return {
                        ...task,
                        done: check,
                    }
                }
                return task
            })

            //Es Necesario Guardar las tareas dentro del estado que corresponda para poder generar un correcto guardado cuando se haga el dragEnd, esa funcion para arrastrar y soltar.
            const newListSaveCheckTask = lists.map((list) => {
                if (list.id === idList) {
                    return {
                        ...list,
                        tasks: newTaskArray,
                    }
                }
                return list

            })
            setLists(newListSaveCheckTask);
            handleTaskListChange(newTaskArray);

            if (idList) {
                TaskServices.updateCheckTask(idUser, idList, idTask, check)
            }
            //DB SAVE


        } catch (e) {
            console.log(e);
        }
    };

    const deleteTask = async (idList, idTask) => {
        try {

            const newTaskArray = taskDtArr.filter((task) => task.taskId !== idTask)
            handleTaskListChange(newTaskArray);

            if (idList) {
                TaskServices.deleteTask(idUserLog, idList, idTask, newTaskArray)
            }


        } catch (e) {
            console.log(e);
        }
    };

    const updateNameTask = async (e, idList, idTask) => {
        try {
            const value = e.currentTarget.textContent;
            console.log(value, idList, idTask)
            const newArray = taskDtArr.map((task) => {
                if (task.taskId === idTask) {
                    return {
                        ...task,
                        taskName: value,
                    }
                }
                return task
            })
            handleTaskListChange(newArray);



            if (idList) {
                TaskServices.updateNameTask(idUserLog, idList, idTask, value)
            }


        } catch (e) {
            console.log(e);
        }
    };





    return (
        <div className={`transition-all duration-1000 ${isAccordionActive ? '' : 'hidden'}`}>

            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId='tasksArr'>
                    {(provided) => (
                        <div

                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='transition-all duration-1000'
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
                                                        isModal={isModal}
                                                        idTask={task.taskId}
                                                        title={task.taskName}
                                                        ifDone={task.done}
                                                        idList={idList}
                                                        key={task.taskId}
                                                        handleCheck={handleCheck}
                                                        deleteTask={deleteTask}
                                                        idUser={idUserLog}
                                                        showDragDots={true}
                                                        updateNameTask={updateNameTask}
                                                    />

                                                </div>

                                            )}

                                        </Draggable>

                                    ))

                                )
                                    : null}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext >
            <AddTask idList={idList} addNewTask={addNewTask} isModal={isModal} />

        </div >)
}

export default DragTasks;