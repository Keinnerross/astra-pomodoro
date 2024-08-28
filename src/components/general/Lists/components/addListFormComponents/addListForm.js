import React, { Fragment, forwardRef, useEffect, useRef } from "react"
import DragTasks from "../tasksComponents/dragTasks"


const AddListForm = forwardRef(({ handleTitleChange, handleTaskListChange, taskDtArr, isActive }, ref) => {





    return (<Fragment>

        <form onSubmit={(e) => e.preventDefault()}>
            <input
                placeholder={"Name your list"}
                onChange={(e) => handleTitleChange(e)}
                ref={ref}
            />
            <DragTasks isAccordionActive={true} idList={false} handleTaskListChange={handleTaskListChange} taskDtArr={taskDtArr} isModal={true} />
        </form>


    </Fragment>

    )
})


/*List es false

*/


export default AddListForm;