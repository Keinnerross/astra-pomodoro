

const { Fragment } = require("react")
import styles from "@/styles/componentes/general/tasks/components/modalAddTask.module.css"

const ModalAddTask = ({ isActive, handleModal }) => {

    return (
        <Fragment>
            <div className={isActive ? styles.ModalAddTaskBackdrop : styles.hidden}
                onClick={() => handleModal()}>


                <form className={isActive ? styles.ModalAddTaskContainer : styles.hidden}
                    onClick={(e) => e.stopPropagation()}
                >

                </form>

            </div>
        </Fragment>
    )
}

export default ModalAddTask;