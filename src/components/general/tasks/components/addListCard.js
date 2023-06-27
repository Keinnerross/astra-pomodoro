import { useState, useRef } from "react";
import styles from "@/styles/componentes/general/tasks/components/addListCard.module.css";
import { themes } from "../../userTemplates/mainUserTemplates";
import { BsRocketTakeoff } from "react-icons/bs";

const AddListCard = ({ addList, numberTheme, themeOpacity }) => {
  const [values, setValues] = useState("");
  const inputAddList = useRef(null);
  const themeSelect = themes(themeOpacity)[numberTheme];

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
          inputAddList.current.value = "";
          e.preventDefault();
        }}
      >
        <input
          style={{
            color: configTheme.iconColor,
            width: "90%",
            "::placeholder": { color: "red" },
          }}
          placeholder="Add A new list..."
          onChange={handleInputChange}
          ref={inputAddList}
        />
        <button type="submit">
          <BsRocketTakeoff fill={configTheme.iconColor} size={20} />
        </button>
      </form>
    </div>
  );
};

export default AddListCard;
