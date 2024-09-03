import React, { Fragment, forwardRef, useEffect, useRef } from "react"
import DragTasks from "../tasksComponents/dragTasks"


const AddListForm = forwardRef(({ handleTitleChange, handleTaskListChange, taskDtArr, isActive }, ref) => {





    return (

        <form 
        className="p-[26px]"
        onSubmit={(e) => e.preventDefault()}>
            <input
            className="text-[22px] font-semibold text-greyFocus"
                placeholder={"Name your list"}
                onChange={(e) => handleTitleChange(e)}
                ref={ref}
            />
            <DragTasks isAccordionActive={true} idList={false} handleTaskListChange={handleTaskListChange} taskDtArr={taskDtArr} isModal={true} />
        </form>



    )
})


/*List es false

*/


export default AddListForm;