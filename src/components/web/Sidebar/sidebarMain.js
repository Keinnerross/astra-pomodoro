import LogoSpartan from "@/components/general/brandComponents/logoComponent";
import styles from "@/styles/componentes/web/sidebar/sidebarMain.module.css";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbMessageLanguage } from "react-icons/tb";
import { MdHelp, MdLogout, MdSettings } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const SidebarMain = ({ ifOpen, toggleSidebar }) => {

    const settingIcons = {
        size: 26,
        white: "#fff",
        black: "#000"
    }

    const [lists, setLists] = useState(null)



    return (<>
{/* Background del modal */}
        <div className={ifOpen ? styles.sidebarBackdrop : styles.hidden}
            onClick={() => toggleSidebar()} >
        </div >

        <div className={ifOpen ? styles.sidebarContainer : styles.hidden}>
            <div className={styles.sidebarSection}>
                <div className={styles.sidebarGroupRow}>
                    {ifOpen ? "hola" : "adios"}
                    <LogoSpartan />
                    <div className={styles.iconContainer}
                    >
                        <button onClick={() => toggleSidebar()} >
                            <MdKeyboardDoubleArrowLeft
                                size={settingIcons.size}
                                fill={settingIcons.white} />
                        </button>
                    </div>


                </div>
                <div className={styles.sidebarGroupColumn}>
                    <div className={styles.sidebarItem}>
                        <TbMessageLanguage
                            size={settingIcons.size}
                            fill={settingIcons.white}
                        />
                        <span>Lenguaje</span>
                    </div>
                    <div className={styles.sidebarItem}>
                        <MdHelp
                            size={settingIcons.size}
                            fill={settingIcons.white} />
                        <span>Acerca de</span>
                    </div>

                </div>

                <div className={styles.sidebarGroupColumn}>
                    <span>Search a List</span>
                    <div className={styles.searchBar}>
                        <input placeholder="Write your name list here" />
                        <IoSearch
                            size={settingIcons.size}
                            fill={settingIcons.black} />
                    </div>
                </div>

                <div className={styles.sidebarGroupColumn}>

                    <span>My Lists</span>
                    {lists ? lists.map(data, () => data) : <span>Your lists could appear here</span>}

                </div>

            </div>
        </div>
    </>
    )
}

export default SidebarMain;