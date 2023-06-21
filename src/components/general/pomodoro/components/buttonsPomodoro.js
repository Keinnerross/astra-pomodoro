import styles from "@/styles/componentes/general/pomodoro/components/buttonsPomodoro.module.css";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import { FaPause } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

const icons = {
  size: 24,
  color: "white",
};

const ButtonsPomo = ({ playPomo, restPomo, stopPomo, ifActive }) => {
  const ifRestPomo = () => {
    restPomo(); /*Agregar Condicional */
  };

  const ifStopPomo = () => {
    stopPomo(); /*Agregar Condicional */
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => ifRestPomo()}>
        <BsFillStopFill size={icons.size} fill={icons.color} />
      </button>
      <button
        className={styles.button}
        style={{ width: 40, height: 40 }}
        onClick={() => playPomo()}
      >
        {ifActive ? (
          <FaPause size={icons.size - 7} fill={icons.color} />
        ) : (
          <BsFillPlayFill size={icons.size} fill={icons.color} />
        )}
      </button>
      <button className={styles.button} onClick={() => ifStopPomo()}>
        <MdOutlineRestartAlt size={icons.size} fill={icons.color} />
      </button>
    </div>
  );
};

export default ButtonsPomo;
