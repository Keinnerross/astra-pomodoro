import React, { Fragment, forwardRef, useContext, useEffect, useRef } from "react"
import DragTasks from "../tasksComponents/dragTasks"


const AddListForm = forwardRef(({ handleTitleChange, handleTaskListChange, taskDtArr }, ref) => {


    return (<Fragment>

        <form onSubmit={(e) => e.preventDefault()}>
            <input
                placeholder={"Name your list"}
                onChange={(e) => handleTitleChange(e)}
                ref={ref}
            />
            <DragTasks isAccordionActive={true} idList={false} handleTaskListChange={handleTaskListChange} taskDtArr={taskDtArr} />
        </form>


    </Fragment>

    )
})


/*List es false

*/


export default AddListForm;