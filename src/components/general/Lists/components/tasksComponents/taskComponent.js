import styles from '@/styles/componentes/general/tasks/components/taskComponent.module.css';
import { useRef, useState, useEffect } from 'react';
import { MdDragIndicator } from 'react-icons/md';
const Task = ({ title, ifDone, idTask, idList, idUser, deleteTask, showDragDots, handleCheck, updateNameTask, isModal }) => {

  const configIcons = {
    color: isModal ? 'black' : 'white',
    iconSize: 15,
  };


  /*Los temas estan puestos aqui para poder testear los estilos, sin embargo hay que ponerlos de forma atomatica relacionadose con la sidebar */
  /**Funcion para actualizar el Nombre de una tarea */

  /*Funcion para acutalizar nombre de la tarea */



  /**Funcion para actualizar el completado de la tarea */

  const [check, setCheck] = useState(idList ? ifDone : false);

  const handleRenderCheck = (e) => {
    const { checked } = e.target
    setCheck(checked);
    handleCheck(idUser, idList, idTask, checked)

  }


  const refTitle = useRef(null)

  useEffect(() => {
    if (refTitle.current) {
      refTitle.current.textContent = title;
    }
  }, [title]);



  /* Funcion para el chek de completado, ((((no implementado ))))*/

  return (
    <div className={`${styles.taskContainer} w-[100%]`}>
      <div className={styles.taskTitleSection}>
        <div className={styles.dragButtonContainer}>
          <MdDragIndicator
            className={styles.dragButton}
            fill={configIcons.color}
            size={configIcons.iconSize}
          />
        </div>

        {/*  */}
        <div className={check ? styles.checkTaskContainerActive : styles.checkTaskContainer}>
          <input
            defaultChecked={check}
            type='checkbox'
            id={idTask}
            onChange={(e) => handleRenderCheck(e)}
            className={isModal ? 'text-slate-900' : 'text-white'}

          />
          <label htmlFor={idTask}></label>
          <div className={styles.settingTaskCard}></div>
        </div>

        <div
          ref={refTitle}
          contentEditable
          className={`${isModal ? ' bg-transparent !text-greyFocus w-[100%]' : 'text-white w-[100%]'} ${check ? 'line-through !text-auxGrey' : 'no-decoration'} overflow-wrap-break-word whitespace-pre-wrap  focus:outline-none transition-1000 min-w-[80%] w-[80px] max-w-[80%] md:min-w-[90%] md:w-[90px] md:max-w-[90%]`}
          onInput={(e) => updateNameTask(e, idList, idTask)}
          suppressContentEditableWarning={true}
        ></div>




      </div>

      <span
        className={`${isModal ? styles.deleteTaskBtnModal : styles.deleteTaskBtn} py-[3px] px-[8px] rounded-[5px] ${isModal ? 'hover:bg-slate-200' : ''}`}
        onClick={() => deleteTask(idList, idTask)}
      >
        x
      </span>
      {/* Este es el que causa el cambio de los margenes cuando se hace hover sobre la tarjeta de la tarea */}
    </div >
  );
};

export default Task;
