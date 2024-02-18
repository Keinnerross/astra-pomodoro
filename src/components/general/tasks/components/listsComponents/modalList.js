const { Fragment, useState } = require("react")
import styles from "@/styles/componentes/general/tasks/components/modalAddTask.module.css"
import DragTasks from "../tasksComponents/dragTasks"
import ListFormTemplate from "./listFormTemplate"

const ModalList = ({ isActive, handleModal, listSelect }) => {

    return (
        <Fragment>
            <div className={isActive ? styles.ModalAddTaskBackdrop : styles.hidden}
                onClick={() => handleModal()}>


                <form className={isActive ? styles.ModalAddTaskContainer : styles.hidden}
                    onClick={(e) => e.stopPropagation()}
                >
                    {listSelect ? (

                        <ListFormTemplate list={listSelect} />
                    )
                        :
                        <ListFormTemplate list={false} />
                    }


                </form>

            </div>
        </Fragment >
    )
}

export default ModalList;