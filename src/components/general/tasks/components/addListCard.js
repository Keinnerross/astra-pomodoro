import { useState } from "react";
import styles from "@/styles/componentes/general/tasks/components/addListCard.module.css";
import { themes } from "../../userTemplates/mainUserTemplates";

const AddListCard = ({ addList }) => {
  const [values, setValues] = useState("");

  const themeSelect = themes[1];

  const configTheme = {
    themeColor: themeSelect.themeColor,
    iconSize: 25,
    iconColor: themeSelect.iconColor,
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setValues(value);
    console.log(value);
  };

  return (
    <div
      className={styles.addListContainer}
      style={{ backgroundColor: configTheme.themeColor }}
    >
      <form
        className={styles.addListContainerform}
        onSubmit={(e) => {
          addList(values);
          e.preventDefault();
        }}
      >
        <input
          style={{ color: configTheme.iconColor }}
          defaultValue="+ New xd"
          onChange={handleInputChange}
        />
        <button type="submit">
          <h3 style={{ color: configTheme.themeColor }}>Done</h3>
        </button>
      </form>
    </div>
  );
};

export default AddListCard;
