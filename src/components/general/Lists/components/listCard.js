import { useEffect, useState, useContext, Fragment, useRef } from 'react';
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
    const value = e.currentTarget.textContent;
    console.log(value)
    setListName(value);
    ListsServices.updateList(idUserLog, userLog, value, listObj.id)
  }

  const handleAccordionActive = () => {
    setAccordionActive(!accordionActive);
  }


  const refTitleList = useRef(null)

  useEffect(() => {
    if (refTitleList.current) {
      refTitleList.current.textContent = listName;
    }
  }, [listName]);







  return (
    <div className={`bg-blackSecundary rounded-b-[10px] p-[10px] relative `}>
      {/**** Menu Flotante*****/}
      <ListSettingMenu
        active={settingActive}
        deleteList={deleteLista}
        idList={thisList.id}
        handleModal={toggleSettingList}
      />

      <Fragment>
        <div className='flex flex-col transition-all duration-1000'>
          <div className='flex pb-[15px] px-[10px] '>
            <div className='flex w-[100%]'>
              <IconixList colorId={listObj.iconChoosed} />
              <div className='pl-[15px] flex flex-col md:w-[87%] md:max-w-[87%] min-w-[61%] max-w-[61%]'>
                <div
                  contentEditable
                  className=' md:w-[93%] md:max-w-[93%] min-h-[28px]overflow-wrap-break-word whitespace-pre-wrap text-white text-[20px] md:text-[30px] font-semibold focus:outline-none'
                  onInput={handleListNameChange}
                  suppressContentEditableWarning={true}
                  ref={refTitleList}
                ></div>
                {taskDtArr.length > 0 ?
                  <span className='text-auxGrey text-[16px]'>
                    {taskDtArr.length === 1 ? `${taskDtArr.length} task in your list` :
                      `${taskDtArr.length} tasks in your list`} </span>
                  : <span className='text-auxGrey text-[16px]'>List emply</span>}
              </div>
              <div className="flex justify-center ">
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
                    <MdKeyboardArrowLeft fill={configTheme.iconColor} size={20} className={accordionActive ? '-rotate-90 transition-all duration-700' : 'transition-all duration-700'} />
                  </button>
                </div>
              </div>
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


