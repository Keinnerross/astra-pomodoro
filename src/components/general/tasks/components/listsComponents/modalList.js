const { Fragment, useState, useContext, useEffect } = require("react")
import styles from "@/styles/componentes/general/tasks/components/modalAddTask.module.css"
import ListFormTemplate from "./listFormTemplate"
import DragTasks from "../tasksComponents/dragTasks"
import * as ListsServices from "@/components/general/tasks/components/listsComponents/listsServices/listsServices";
import { AppContext } from "@/Context/store";



const ModalList = ({ isActive, handleModal, listSelect, fetchData }) => {

    const { lists, setLists, userLog, idUserLog } = useContext(AppContext);
    const [tempTitleValue, setTemTitleValue] = useState("")

    const saveTitleList = (titleList) => {
        setTemTitleValue(titleList);
    }

    const saveListWithHandleModal = async () => {
        handleModal()

        const newLists = await ListsServices.addList(tempTitleValue, lists, userLog, idUserLog)
        setLists(newLists)

    }


    useEffect(() => {
        if (isActive === false) {
            fetchData();

        }

    }, [isActive])




    return (
        <Fragment>
            <div className={isActive ? styles.ModalAddTaskBackdrop : styles.hidden}
                onClick={() => {
                    listSelect ? handleModal() :
                        saveListWithHandleModal()
                }
                }>


                <form className={isActive ? styles.ModalAddTaskContainer : styles.hidden}
                    onClick={(e) => e.stopPropagation()}
                >
                    {listSelect ? (

                        <ListFormTemplate list={listSelect} />
                    )
                        :
                        <ListFormTemplate list={false} saveTitleList={saveTitleList} />
                    }


                </form>

            </div>
        </Fragment >
    )
}

export default ModalList;