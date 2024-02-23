import { useState, Fragment } from "react"
import DragTasks from "../tasksComponents/dragTasks"



const NewListForm = ({ saveTitleList }) => {

    const [titleList, setTitleList] = useState("")


    const createLists = async (e) => {
        const { value } = e.target;
        setTitleList(value)
        saveTitleList(value)


    }

    return (
        <Fragment>
            <input placeholder="Titulo"
                defaultValue={titleList}
                onChange={(e) => createLists(e)} />
            <DragTasks taskDataArray={[]} idList={"001"} />
        </Fragment>

    )
}


export default NewListForm;