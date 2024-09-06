

import { useEffect, useState } from 'react';
import { iconixDB, colors } from './IconixDB';
//Color id debe ser cambiado
const IconixList = ({ colorId, tag }) => {





    const [colorChoosed, setColorChoosed] = useState('fff'); //debe ser cambiado por icon choosed





    const url = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8eccc067-468a-44db-85b6-d90bd9486aa6/duhbny-eb0d024d-ac5e-477a-859d-f78c76c27965.jpg/v1/fill/w_1024,h_633,q_75,strp/spartan_by_alexruizart_duhbny-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjMzIiwicGF0aCI6IlwvZlwvOGVjY2MwNjctNDY4YS00NGRiLTg1YjYtZDkwYmQ5NDg2YWE2XC9kdWhibnktZWIwZDAyNGQtYWM1ZS00NzdhLTg1OWQtZjc4Yzc2YzI3OTY1LmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.CHjnk5920QX89GnHC3GrlsXV7mwHjBx6FSjv7QCtuCE';

    useEffect(() => {
        setColorChoosed(colors[colorId ? colorId : 0].color);
    }, [colorChoosed])


    return (
        <div
            className={`rounded-[10px] w-[52px] bg-center bg-no-repeat bg-cover h-[54px] min-w-[54px] shadow-border-inset border-[#ffd100]`}
            style={{ backgroundImage: `url('${url}')`, border: `3px solid ${colorChoosed}`, }}
        ></div>
    )
}

// 
// 

export default IconixList;