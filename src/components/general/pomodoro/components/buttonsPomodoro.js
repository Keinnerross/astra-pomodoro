import styles from "@/styles/componentes/general/pomodoro/components/buttonsPomodoro.module.css";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

const icons = {
  size: 30,
  color: "white",
};

const ButtonsPomo = ({ playPomo, restPomo, stopPomo, ifActive, ifOpen }) => {
  const ifRestPomo = () => {
    restPomo(); /*Agregar Condicional */
  };

  const ifStopPomo = () => {
    stopPomo(); /*Agregar Condicional */
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.playButton}
        style={{ width: 38, height: 38 }}
        onClick={() => playPomo()}
      >
        {ifActive ? (
          <span className="font-semibold">stop</span>
        ) : (
          <span className="font-semibold">start</span>

        )}
      </button>


      <div className={styles.buttonsAuxiliarSection}>
        <button className={styles.buttonAuxiliar} onClick={() => ifRestPomo()}>
          <MdOutlineRestartAlt size={icons.size} fill={icons.color} />
        </button>

        <button className={styles.settingPomoButton} onClick={() => ifOpen(true)}>
          <AiFillSetting size={icons.size} fill={"white"} />
        </button>
      </div>
    </div>

  );
};

export default ButtonsPomo;
