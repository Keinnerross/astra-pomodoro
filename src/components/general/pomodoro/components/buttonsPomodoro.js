import styles from "@/styles/componentes/general/pomodoro/components/buttonsPomodoro.module.css";

const ButtonsPomo = ({ playPomo, restPomo, stopPomo }) => {
  const ifRestPomo = () => {
    restPomo(); /*Agregar Condicional */
  };

  const ifStopPomo = () => {
    stopPomo(); /*Agregar Condicional */
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => ifRestPomo()}>
        0
      </button>
      <button
        className={styles.button}
        style={{ width: 40, height: 40 }}
        onClick={() => playPomo()}
      >
        Play
      </button>
      <button className={styles.button} onClick={() => ifStopPomo()}>
        X
      </button>
    </div>
  );
};

export default ButtonsPomo;
