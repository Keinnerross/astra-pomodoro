import React, { Fragment } from "react"
import DragTasks from "../tasksComponents/dragTasks"

const ListFormTemplate = ({ list, }) => {
    return (<Fragment>
        {list ? (
            <Fragment>
                <input value={list.listName} />
                <DragTasks taskDataArray={list.tasks} idList={list.id} />
            </Fragment>
        ) :
            <Fragment>
                <input placeholder="Titulo"
                    value={""} />
                <DragTasks taskDataArray={[]} idList={""} />
            </Fragment>}




    </Fragment>
    )
}


/*List es false

*/


export default ListFormTemplate