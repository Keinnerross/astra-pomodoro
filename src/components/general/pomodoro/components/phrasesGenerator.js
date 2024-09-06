import { spartanPhrases } from './dataPhrases'
import React, { useEffect, useState } from 'react';

const PhrasesGenerator = () => {

    const [indexPhrase, setIndexPhrase] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);



    useEffect(() => {
        const intervalIndex = setInterval(() => {
            const newIndex = Math.floor(Math.random() * spartanPhrases.length);
            setIndexPhrase(newIndex);
            setIsFadingOut(false);


            setTimeout(() => {
                setIsFadingOut(true)

            }, 6000);


        }, 7000);



        // Cleanup interval on component unmount
        return () => clearInterval(intervalIndex);
    }, [spartanPhrases]);






    return (
        <div className='min-h-[80px]'>
            <span className={`${isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'} text-center md:text-left flex justify-center md>justify:start`}
            >&apos;{spartanPhrases[indexPhrase]}&apos;</span>
        </div>
    )
}

export default PhrasesGenerator;