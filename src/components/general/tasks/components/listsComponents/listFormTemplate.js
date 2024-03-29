import React, { Fragment, useState, useContext, useEffect } from "react"
import DragTasks from "../tasksComponents/dragTasks"
import * as ListsServices from "@/components/general/tasks/components/listsComponents/listsServices/listsServices";
import { AppContext } from "@/Context/store";
import NewListForm from "./NewListForm";
const ListFormTemplate = ({ list, saveTitleList }) => {


    const { idUserLog } = useContext(AppContext);
    const { userLog } = useContext(AppContext);
    const { setLists } = useContext(AppContext);

    const [listTitle, setListTitle] = useState("")


    const handleInputChange = (e, idList) => {
        const { value } = e.target;

        setLists(prevLists => {
            const updateList = prevLists.map(listItem => {
                if (listItem.id === idList) {
                    return { ...listItem, listName: value };
                }
                return listItem
            });

            setListTitle(value)
            ListsServices.updateList(idUserLog, userLog, value, list.id, updateList);

            return updateList;
        })


    };


    useEffect(() => {
        setListTitle(list.listName)


    }, [list,])



    ///AQUI DEBE HACERSE LA CONFIGURACION DE LA CREACION DE LAS TAREAS Y EL MANEJO DE LOS ESTADOS////

    return (<Fragment>
        {list ? (
            <Fragment>
                <input
                    defaultValue={listTitle}
                    onChange={(e) => handleInputChange(e, list.id)}
                />


                <DragTasks taskDataArray={list.tasks} idList={list.id} />
            </Fragment>
        ) :

            <NewListForm saveTitleList={saveTitleList} />}



    </Fragment>
    )
}


/*List es false

*/


export default ListFormTemplate