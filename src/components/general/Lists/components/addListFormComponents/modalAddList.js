const { Fragment, useState, useContext, useEffect, useRef } = require("react")
import styles from "@/styles/componentes/general/tasks/components/modalAddTask.module.css"
import ListFormTemplate from "./addListForm"
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "@/Context/store";



const ModalAddList = ({ isActive, saveNewList }) => {

    // const { lists, setLists, userLog, idUserLog } = useContext(AppContext);

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
        setListTitle("")
        setTasksList([])
        inputTitleListRef.current.value = "";

        const idList = uuidv4();

        const newList = {
            listName: listTitle,
            order: 0,
            tasks: tasksList,
            id: idList
        };

        saveNewList(newList, tasksList)



    }








    return (
        <Fragment>
            <div className={isActive ? styles.ModalAddTaskBackdrop : styles.hidden}
                onClick={() => saveListWithHandleModal()}>


                <form className={isActive ? styles.ModalAddTaskContainer : styles.hidden}
                    onClick={(e) => e.stopPropagation()}
                >

                    <ListFormTemplate handleTitleChange={handleTitleChange} handleTaskListChange={handleTaskListChange} taskDtArr={tasksList} ref={inputTitleListRef} />


                </form>

            </div>
        </Fragment >
    )
}

export default ModalAddList;