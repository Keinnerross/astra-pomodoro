// import styles from "@/styles/componentes/web/sidebar/components/whatIsPomodoro.module.css";

const WhatIsPomodoro = ({ ifOpen, toggleInfoPomo }) => {
  return (
    <>
      <div
        className="flex flex-col justify-center"
        onClick={() => toggleInfoPomo()}
      >
        <div
          className="w-[75%] text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>What Is Pomodoro?🍅</h2>
          <p>
            La técnica Pomodoro es un método de gestión del tiempo desarrollado
            por Francesco Cirillo a fines de la década de 1980. El nombre
            "Pomodoro" proviene de la palabra italiana que significa "tomate",
            en referencia a los temporizadores de cocina en forma de tomate que
            Cirillo solía utilizar durante su desarrollo. La técnica Pomodoro se
            basa en la idea de dividir el tiempo en intervalos de trabajo
            intensivo llamados "pomodoros" seguidos de breves descansos. Aquí se
            describe el proceso básico de la técnica: Planificación: Antes de
            comenzar, haz una lista de las tareas que necesitas realizar.
            Establecimiento del temporizador: Configura un temporizador a 25
            minutos, que se conoce como un "pomodoro". Trabajo enfocado: Durante
            el pomodoro, concéntrate únicamente en una tarea específica y
            trabaja en ella sin distracciones hasta que suene el temporizador.
            Descanso corto: Después de completar un pomodoro, toma un descanso
            corto de aproximadamente 5 minutos. Utiliza este tiempo para
            relajarte, estirarte o alejarte de la pantalla. Repetición: Repite
            el ciclo de trabajo y descanso. Después de completar cuatro
            pomodoros consecutivos, toma un descanso más largo de
            aproximadamente 15-30 minutos. La idea detrás de la técnica Pomodoro
            es que los intervalos de trabajo y descanso regulares pueden mejorar
            la concentración y la productividad. Al dividir el trabajo en
            segmentos más pequeños y manejables, es más fácil mantener la
            motivación y evitar la fatiga mental. La técnica Pomodoro también
            promueve la conciencia del tiempo y ayuda a identificar patrones de
            trabajo y las distracciones que pueden afectar la productividad.
            Además, puede ser adaptada y ajustada según las necesidades y
            preferencias individuales. Es importante tener en cuenta que la
            técnica Pomodoro no es adecuada para todos y puede requerir ciertos
            ajustes para adaptarse a diferentes estilos de trabajo. Algunas
            personas pueden encontrar beneficios al utilizar esta técnica para
            mejorar su enfoque y administración del tiempo, mientras que otras
            pueden preferir otros enfoques.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default WhatIsPomodoro;
