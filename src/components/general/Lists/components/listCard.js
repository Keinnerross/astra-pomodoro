import { useEffect, useState, useContext, Fragment } from 'react';
import styles from '@/styles/componentes/general/tasks/components/listCard.module.css';
import ListSettingMenu from './listSettingMenu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DragTasks from './tasksComponents/dragTasks';
import IconixList from '@/components/general/Lists/components/Iconix/iconixLists'
import { AppContext } from '@/Context/store';
import * as ListsServices from '@/components/general/Lists/components/addListFormComponents/listsServices/listsServices';
import { MdKeyboardArrowLeft } from 'react-icons/md';


const ListCard = ({ listObj, deleteLista }) => {


  /*Configuracion Btns */
  const configTheme = {
    themeColor: '#0A2841',
    iconSize: 25,
    iconColor: 'white',
  };



  /*Estado dónde se guardan las tareas */
  const { userLog, idUserLog } = useContext(AppContext);
  const [taskDtArr, setTaskDtArr] = useState([]);
  const [settingActive, setSettingActive] = useState(false);
  const [thisList, setThisList] = useState({})
  const [listName, setListName] = useState('');
  const [accordionActive, setAccordionActive] = useState(false);






  useEffect(() => {
    setTaskDtArr(listObj.tasks);
    setThisList(listObj);
    setListName(listObj.listName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  const toggleSettingList = () => {
    setSettingActive(!settingActive);
  };

  // Task List Change Controller 
  const handleTaskListChange = (tasks) => {
    setTaskDtArr(tasks);
  }

  const handleListNameChange = (e) => {
    const { value } = e.target;
    setListName(value);
    ListsServices.updateList(idUserLog, userLog, value, listObj.id)
  }

  const handleAccordionActive = () => {
    setAccordionActive(!accordionActive);
  }






  return (
    <div className={`bg-blackSecundary rounded-b-[10px] p-[10px] relative`}>
      {/**** Menu Flotante*****/}
      <ListSettingMenu
        active={settingActive}
        deleteList={deleteLista}
        idList={thisList.id}
        handleModal={toggleSettingList}
      />

      <Fragment>
        <div className='flex flex-col transition-all duration-1000'>
          <div class='flex pb-[15px] px-[10px]'>
            <div class='flex w-[100%]'>
              <IconixList colorId={listObj.iconChoosed} />
              <div class='pl-[15px] flex flex-col '>
                <input className='text-white text-[30px] w-[100%] h-[28px] font-semibold'
                  defaultValue={listName}
                  onChange={(e) => handleListNameChange(e)}
                />
                {taskDtArr.length > 0 ?
                  <span className='text-auxGrey text-[16px]'>
                    {taskDtArr.length === 1 ? `${taskDtArr.length} task in your list` :
                      `${taskDtArr.length} tasks in your list`} </span>
                  : <span className='text-auxGrey text-[16px]'>List emply</span>}
              </div>
            </div>



            <div onClick={(e) => e.stopPropagation()}>
              <button
                className='p-[5px] rounded-[5px] hover:bg-greyFocus'
                onClick={() => toggleSettingList()}>
                <BsThreeDotsVertical fill={configTheme.iconColor} />
              </button>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <button
                className='p-[5px] rounded-[5px] hover:bg-greyFocus'
                onClick={() => handleAccordionActive()}>
                <MdKeyboardArrowLeft fill={configTheme.iconColor} size={20} class={accordionActive ? '-rotate-90 transition-all duration-700' : 'transition-all duration-700'} />
              </button>
            </div>

          </div>

          {/**Tareas*/}

          {/* transition-all duration-1000 ${accordionActive ? 'animate-slide-down' : 'animate-slide-up'}`} */}

          <DragTasks isAccordionActive={accordionActive} idList={thisList.id} taskDtArr={taskDtArr} handleTaskListChange={handleTaskListChange} />







        </div >
      </Fragment>
    </div >
  );
};

export default ListCard;


