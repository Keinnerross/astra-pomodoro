import styles from "@/styles/componentes/general/tasks/components/addTask.module.css";
import React, { useState, useRef } from "react";
import { addNewTask } from "./services/tasksBookServices"


const AddTask = ({ idList, addNewTask }) => {

    const [values, setValues] = useState("");


    const inputAddTaskRef = useRef(null);

    const handleInputTask = (e) => {
        const { value } = e.target;
        setValues(value);
    };

    return (
        <div className={styles.addTaskSection}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addNewTask(idList, values);
                    inputAddTaskRef.current.value = "";
                }}
            >
                <input
                    className={styles.addTaskInput}
                    placeholder="+ Add new task"
                    onChange={handleInputTask}
                    ref={inputAddTaskRef}
                />
            </form>
        </div>
    )
}

export default AddTask