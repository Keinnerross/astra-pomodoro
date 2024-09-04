
const ItemsSidebarCars = ({ Icon, title, size }) => {




    const settingIcons = {
        size: size ? size : 26,
        white: "#fff",
        black: "#000"
    }
    return (


        < div className="flex p-[6px] hover:bg-greyFocus rounded-[7px] cursor-pointer gap-[4px]">
            <Icon
                size={settingIcons.size}
                fill={settingIcons.white} />
            <span>{title}</span>
        </ div>
    )



}


export default ItemsSidebarCars;