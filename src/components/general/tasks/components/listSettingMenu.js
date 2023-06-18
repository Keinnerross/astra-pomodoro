import styles from "@/styles/componentes/general/tasks/components/listSettingMenu.module.css";

const ListSettingMenu = ({ active, deleteList, idList }) => {
  return (
    <div className={active ? styles.listSettingContainer : styles.hidden}>
      <div>
        <button>Archive List</button>
        <button onClick={() => deleteList(idList)}>
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default ListSettingMenu;
