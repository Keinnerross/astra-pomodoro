import { useEffect, useState, useContext, Fragment } from "react";
import styles from "@/styles/componentes/general/tasks/components/listCard.module.css";
import ListSettingMenu from "./listSettingMenu";
import { BsThreeDotsVertical } from "react-icons/bs";
import DragTasks from "./tasksComponents/dragTasks";
import { AppContext } from "@/Context/store";
import * as ListsServices from "@/components/general/Lists/components/addListFormComponents/listsServices/listsServices";
import { IoIosArrowDown } from "react-icons/io";

const ListCard = ({ listObj, deleteLista }) => {


  /*Configuracion Btns */
  const configTheme = {
    themeColor: "#0A2841",
    iconSize: 25,
    iconColor: "white",
  };



  /*Estado dónde se guardan las tareas */
  const { userLog, idUserLog } = useContext(AppContext);
  const [taskDtArr, setTaskDtArr] = useState([]);
  const [settingActive, setSettingActive] = useState(false);
  const [thisList, setThisList] = useState({})
  const [listName, setListName] = useState("");
  const [accordionActive, setAccordionActive] = useState(false);






  useEffect(() => {
    setTaskDtArr(listObj.tasks);
    setThisList(listObj);
    setListName(listObj.listName);
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
    <div class="bg-blackSecundary rounded-b-[10px] p-[10px]  relative ">
      {/**** Menu Flotante*****/}
      <ListSettingMenu
        active={settingActive}
        deleteList={deleteLista}
        idList={thisList.id}
        handleModal={toggleSettingList}
      />

      <Fragment>
        <div className="flex flex-col">
          <div class="flex pb-[15px] px-[10px]">
            <div class="flex w-[100%]">
              <div class="rounded-[10px] w-[52px] h-[54px] min-w-[54px] shadow-border-inset border-[3px] border-solid border-[#ffd100] bg-[url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8eccc067-468a-44db-85b6-d90bd9486aa6/duhbny-eb0d024d-ac5e-477a-859d-f78c76c27965.jpg/v1/fill/w_1024,h_633,q_75,strp/spartan_by_alexruizart_duhbny-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjMzIiwicGF0aCI6IlwvZlwvOGVjY2MwNjctNDY4YS00NGRiLTg1YjYtZDkwYmQ5NDg2YWE2XC9kdWhibnktZWIwZDAyNGQtYWM1ZS00NzdhLTg1OWQtZjc4Yzc2YzI3OTY1LmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.CHjnk5920QX89GnHC3GrlsXV7mwHjBx6FSjv7QCtuCE')] bg-center bg-no-repeat bg-cover"></div> {/*Icon List*/}
              <div class="pl-[10px] flex flex-col ">
                <input className="text-white text-[30px] w-[100%] h-[25px] font-semibold"
                  defaultValue={listName}
                  onChange={(e) => handleListNameChange(e)}
                />
                {taskDtArr.length > 0 ?
                  <span className="text-auxGrey text-[16  px]"> {taskDtArr.length} tareas en tu lista</span>
                  : <span className="text-auxGrey text-[16  px]">Esta lista está vacia</span>}
              </div>
            </div>



            <div onClick={(e) => e.stopPropagation()}>
              <button
                className="p-[5px] rounded-[5px] hover:bg-greyFocus"
                onClick={() => toggleSettingList()}>
                <BsThreeDotsVertical fill={configTheme.iconColor} />
              </button>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <button
                className="p-[5px] rounded-[5px] hover:bg-greyFocus"
                onClick={() => handleAccordionActive()}>
                <IoIosArrowDown fill={configTheme.iconColor} />
              </button>
            </div>

          </div>

          {/**Tareas*/}



          <DragTasks isAccordionActive={accordionActive} idList={thisList.id} taskDtArr={taskDtArr} handleTaskListChange={handleTaskListChange} />







        </div >
      </Fragment>
    </div >
  );
};

export default ListCard;


