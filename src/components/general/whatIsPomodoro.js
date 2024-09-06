
import Head from 'next/head';
import { GiSpartanHelmet, GiSandsOfTime, GiMeditation } from 'react-icons/gi';
import { FaBullseye } from 'react-icons/fa';
const WhatIsPomodoro = () => {
    return (
        <div
            id="whatIsPomodoro" className="min-h-screen bg-blackSecundary text-white">
            <Head>
                <title>Método Pomodoro y Spartan Pomodoro</title>
                <meta name="description" content="Aprende sobre el método Pomodoro y los beneficios de usar Spartan Pomodoro, una app con temática espartana." />
            </Head>
            <main className='flex flex-col items-center'>
                <div className=" md:w-[55%] pt-[50px] md:pt-[100px] pb-12 px-6">
                    <section className="mb-12">
                        <h1 className="text-[32px] md:text-4xl font-bold mb-6 flex items-center">
                            <GiSandsOfTime className="text-red-500 mr-3"/>
                            ¿Qué es el Método Pomodoro?
                        </h1>
                        <p className="text-lg leading-relaxed">
                            El Método Pomodoro es una técnica de gestión del tiempo desarrollada por Francesco Cirillo a finales de los años 80. Se basa en la idea de dividir el trabajo en intervalos de tiempo fijos, generalmente de 25 minutos, conocidos como "Pomodoros", seguidos de un breve descanso. Después de completar cuatro Pomodoros, se toma un descanso más largo. Este método promueve la concentración y reduce la fatiga mental, ayudando a mejorar la productividad y la eficiencia.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 flex items-center">
                            <GiMeditation className="text-red-500 mr-3" />
                            Beneficios del Método Pomodoro
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            <li className="flex items-center">
                                <FaBullseye className="text-yellow-500 mr-3" />
                                Mejora la concentración y el enfoque al trabajar en intervalos de tiempo controlados.
                            </li>
                            <li className="flex items-center">
                                <FaBullseye className="text-yellow-500 mr-3" />
                                Reduce la fatiga mental al incluir descansos regulares.
                            </li>
                            <li className="flex items-center">
                                <FaBullseye className="text-yellow-500 mr-3" />
                                Facilita la gestión del tiempo y ayuda a evitar la procrastinación.
                            </li>
                            <li className="flex items-center">
                                <FaBullseye className="text-yellow-500 mr-3" />
                                Fomenta una mayor productividad al estructurar el tiempo de trabajo y descanso.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-4 flex items-center">
                            <GiSpartanHelmet className="text-red-500 mr-3" />
                            ¿Por qué usar Spartan Pomodoro?
                        </h2>
                        <p className="text-lg leading-relaxed">
                            Spartan Pomodoro es una app diseñada para aquellos que buscan disciplina y determinación en su gestión del tiempo. Con una temática espartana, esta app no solo te ayuda a seguir el Método Pomodoro, sino que también te inspira a mantener un enfoque firme y constante, como un verdadero espartano. Es ideal para quienes desean mejorar su productividad y alcanzar sus metas con una mentalidad de guerrero.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default WhatIsPomodoro;