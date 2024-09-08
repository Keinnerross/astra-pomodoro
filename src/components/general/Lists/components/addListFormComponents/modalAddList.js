const { Fragment, useState, useContext, useEffect, useRef } = require("react")
import styles from "@/styles/componentes/general/tasks/components/modalAddTask.module.css"
import ListFormTemplate from "./addListForm"
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "@/Context/store";



const ModalAddList = ({ isActive, saveNewList, cancelList }) => {


    // Modal List States
    const [listTitle, setListTitle] = useState("")
    const [tasksList, setTasksList] = useState([])

    // Title List Change Controller 
    const handleTitleChange = (e) => {
        const { value } = e.target;
        setListTitle(value);
    }

    // Task List Change Controller 
    const handleTaskListChange = (tasks) => {
        setTasksList(tasks);
    }



    const inputTitleListRef = useRef(null);

    const saveListWithHandleModal = async () => {

        const idList = uuidv4();

        const newList = {
            listName: listTitle,
            order: 0,
            tasks: tasksList,
            id: idList,
            iconChoosed: Math.floor(Math.random() * 10)
        };

        if (listTitle.trim() === '') {
            cancelList();
        } else {
            saveNewList(newList, tasksList)
            setListTitle("")
            setTasksList([])
            inputTitleListRef.current.value = "";
        }



    }


    useEffect(() => {

        isActive ? inputTitleListRef.current.focus() : null
    }, [isActive])







    return (
        <div className={`${isActive ? styles.ModalAddTaskBackdrop : styles.hidden}`}
            onMouseDown={() => saveListWithHandleModal()}>


            <div className={`${styles.ModalAddTaskContainer} w-full h-svh md:rounded-[9px] md:w-[410px] md:h-[500px] flex flex-col justify-between`}
                onMouseDown={(e) => e.stopPropagation()}
            >


                <ListFormTemplate
                    isActive={isActive}
                    handleTitleChange={handleTitleChange} handleTaskListChange={handleTaskListChange}
                    taskDtArr={tasksList}
                    ref={inputTitleListRef}
                    saveList={saveListWithHandleModal}
                />


                <div className="w-[100%] h-[50px] p-[25px] bg-slate-200 flex justify-end items-center rounded-b-[7px]">
                    <span
                        className="hidden md:block cursor-pointer p-[8px] font-semibold text-greyFocus rounded-[7px] hover:bg-slate-300"
                        onClick={() => cancelList()}>
                        Cancel
                    </span>
                </div>

            </div>



        </div>
    )
}

export default ModalAddList;