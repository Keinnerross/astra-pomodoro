import React, { Fragment, forwardRef, useEffect, useRef } from "react"
import DragTasks from "../tasksComponents/dragTasks"
import { IoMdArrowRoundBack  } from "react-icons/io";

const AddListForm = forwardRef(({ handleTitleChange, handleTaskListChange, taskDtArr, saveList }, ref) => {





    return (
        <div className="flex flex-col p-[26px]">

            <div
                onClick={() => saveList()}
                className="w-full text-end pb-[15px] font-bold cursor-pointer flex justify-start">
                <span className="text-slate-800 md:hidden "><IoMdArrowRoundBack  /></span>
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}>
                <input
                    className="text-[22px] font-semibold text-greyFocus"
                    placeholder={"Name your list"}
                    onChange={(e) => handleTitleChange(e)}
                    ref={ref}
                />
                <DragTasks isAccordionActive={true} idList={false} handleTaskListChange={handleTaskListChange} taskDtArr={taskDtArr} isModal={true} />
            </form>

        </div>

    )
})


/*List es false

*/


export default AddListForm;