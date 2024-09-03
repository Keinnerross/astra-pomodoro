import { spartanPhrases } from "./dataPhrases"
import React, { useEffect, useState } from "react";

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
    }, [spartanPhrases.length]);






    return (
        <div >
            <span className={isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'}
            >"{spartanPhrases[indexPhrase]}"</span>
        </div>
    )
}

export default PhrasesGenerator;