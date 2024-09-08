import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GiSpartanHelmet, GiSandsOfTime, GiMeditation } from 'react-icons/gi';
import { FaBullseye } from 'react-icons/fa';

const WhatIsPomodoro = () => {




    const [iconSize, setIconSize] = useState(40);

    // Actualiza el tamaño del ícono en función del tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 668) {
                setIconSize(80);
            } else {
                setIconSize(20); 
            }
        }; 
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);



    return (
        <div
            id='whatIsPomodoro' className='min-h-screen bg-blackSecundary text-white'>
            <Head>
                <title>Pomodoro Method and Spartan Pomodoro</title>
                <meta name='description' content='Learn about the Pomodoro method and the benefits of using Spartan Pomodoro, a spartan-themed app.' />
            </Head>
            <main className='flex flex-col items-center'>
                <div className=' md:w-[55%] pt-[50px] md:pt-[100px] pb-12 px-6'>
                    <section className='mb-12'>
                        <h1 className='text-[32px] md:text-4xl font-bold mb-6 flex items-center'>
                            <GiSandsOfTime
                                size={iconSize}
                                className='text-red-500 mr-3' />
                            What is the Pomodoro Method?
                        </h1>
                        <p className='text-lg leading-relaxed'>
                            The Pomodoro Method is a time management technique developed by Francesco Cirillo in the late 1980s. It is based on the idea of dividing work into fixed time intervals, usually 25 minutes long, known as &apos;Pomodoros&apos;, followed by a short break. After completing four Pomodoros, a longer break is taken. This method promotes concentration and reduces mental fatigue, helping to improve productivity and efficiency.
                        </p>
                    </section>

                    <section className='mb-12'>
                        <h2 className='text-3xl font-semibold mb-4 flex items-center'>
                            <GiMeditation
                                size={iconSize}
                                className='text-red-500 mr-3' />
                            Benefits of the Pomodoro Method
                        </h2>
                        <ul className='list-disc list-inside space-y-2 text-lg'>
                            <li className='flex items-center'>
                                <FaBullseye className='text-yellow-500 mr-3' />
                                Improves concentration and focus by working in controlled time intervals.
                            </li>
                            <li className='flex items-center'>
                                <FaBullseye className='text-yellow-500 mr-3' />
                                Reduces mental fatigue by incorporating regular breaks.
                            </li>
                            <li className='flex items-center'>
                                <FaBullseye className='text-yellow-500 mr-3' />
                                Facilitates time management and helps avoid procrastination.
                            </li>
                            <li className='flex items-center'>
                                <FaBullseye className='text-yellow-500 mr-3' />
                                Boosts productivity by structuring work and rest time.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className='text-3xl font-semibold mb-4 flex items-center'>
                            <GiSpartanHelmet
                                size={iconSize}
                                className='text-red-500 mr-3' />
                            Why use Spartan Pomodoro?
                        </h2>
                        <p className='text-lg leading-relaxed'>
                            Spartan Pomodoro is an app designed for those who seek discipline and determination in their time management. With a Spartan theme, this app not only helps you follow the Pomodoro Method, but also inspires you to maintain a steady and focused approach, like a true Spartan. It&apos;s ideal for those who want to improve their productivity and achieve their goals with a warrior mindset.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default WhatIsPomodoro;
