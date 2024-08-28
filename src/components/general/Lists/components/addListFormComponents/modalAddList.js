const { Fragment, useState, useContext, useEffect, useRef } = require("react")
import styles from "@/styles/componentes/general/tasks/components/modalAddTask.module.css"
import ListFormTemplate from "./addListForm"
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "@/Context/store";



const ModalAddList = ({ isActive, saveNewList }) => {


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
            id: idList
        };

        if (listTitle.trim() === '') {
            alert("You need to name your List");
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
        <Fragment>
            <div className={isActive ? styles.ModalAddTaskBackdrop : styles.hidden}
                onClick={() => saveListWithHandleModal()}>


                <form className={isActive ? styles.ModalAddTaskContainer : styles.hidden}
                    onClick={(e) => e.stopPropagation()}
                >

                    <ListFormTemplate isActive={isActive} handleTitleChange={handleTitleChange} handleTaskListChange={handleTaskListChange} taskDtArr={tasksList} ref={inputTitleListRef} />


                </form>

            </div>
        </Fragment >
    )
}

export default ModalAddList;