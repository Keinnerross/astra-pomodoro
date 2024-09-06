import React, { useEffect, useState } from 'react';

const ProgressBar = ({ isActive, pomoSession, pomoValue, shortValue, longValue, time }) => {
  const [barValue, setBarValue] = useState(100);

  useEffect(() => {
    if (pomoSession === 'Pomodoro') {
      setBarValue(pomoValue);
    } else if (pomoSession === 'Short') {
      setBarValue(shortValue);
    } else if (pomoSession === 'Long') {
      setBarValue(longValue);
    }
  }, [pomoSession, pomoValue, shortValue, longValue, time]);



  const barProgress = (time / 60 / barValue) * 100; /*Corregir */






  // 

  return (
    <div className={`${isActive ? ' w-[100%] md:w-[70%] h-[12px] bg-greyFocus' : 'w-[20%] bg-blackSecundary h-[10px]'}  my-[25px] rounded-[25px] overflow-hidden flex justify-center transition-all duration-[1.5s] `}>
      <div

        // ''
        className={`${isActive ? 'bg-redMain' : 'bg-blackSecundary'} h-full transition-all duration-[3.5s`}
        style={{ width: `${barProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
