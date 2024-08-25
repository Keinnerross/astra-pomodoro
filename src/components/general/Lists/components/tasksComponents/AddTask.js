import styles from "@/styles/componentes/general/tasks/components/addTask.module.css";
import React, { useState, useRef } from "react";


const AddTask = ({ idList, addNewTask }) => {

    const [values, setValues] = useState("");


    const inputAddTaskRef = useRef(null);

    const handleInputTask = (e) => {
        const { value } = e.target;
        setValues(value);
    };

    return (
        <div className={styles.addTaskSection}>

            <input
                className="color-slate-900 text-[14px] cursor-pointer"
                placeholder="+ Add new task"
                onChange={handleInputTask}
                ref={inputAddTaskRef}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        inputAddTaskRef.current.value = "";
                        addNewTask(idList, values);
                    }

                }}
            />


        </div >
    )
}

export default AddTask