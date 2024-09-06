
import React, { Fragment } from 'react';
import LogoSpartan from '@/components/general/brandComponents/logoComponent';
import styles from '@/styles/componentes/web/sidebar/sidebarMain.module.css';
import { MdKeyboardDoubleArrowLeft, MdHelp, MdDarkMode, MdSettings, } from 'react-icons/md';
import { IoMdPricetags } from 'react-icons/io';
import { Tooltip } from 'react-tooltip'


import ItemsSidebarCars from './itemsSidebarCard';
const SidebarMain = ({ ifOpen, toggleSidebar }) => {


    const settingIcons = {
        size: 26,
        white: '#fff',
        black: '#000'
    }

    return (<Fragment>
        {/* Background del modal */}
        <div className={ifOpen ? styles.sidebarBackdrop : styles.hidden}
            onClick={() => toggleSidebar()} >
        </div >

        <div className={`${ifOpen ? 'w-[300px] h-full fixed bg-blackPrimary flex flex-col overflow-hidden z-[9999999]' : 'hidden'}`}>
            <div className='flex flex-col h-full p-[20px]'>
                <div className={styles.sidebarGroupRow}>
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
                <div className='flex flex-col justify-between h-full '>
                    <div className='flex flex-col gap-[8px] py-[25px]'>


                        {/* <ItemsSidebarCars title='Language' Icon={TbMessageLanguage} /> */}
                        <div data-tooltip-id='my-tooltip' data-tooltip-content='This feature will be available soon'>
                            <ItemsSidebarCars title='Tags' Icon={IoMdPricetags} />
                        </div>
                        {/* <ItemsSidebarCars title='Music' Icon={TbMessageLanguage} /> */}
                        <div data-tooltip-id='my-tooltip' data-tooltip-content='This feature will be available soon'>
                            <ItemsSidebarCars title='Theme' Icon={MdDarkMode} />
                        </div>
                        <a href='#whatIsPomodoro' onClick={() => toggleSidebar()}>
                            <ItemsSidebarCars title='What is Pomodoro?' Icon={MdHelp} />
                        </a>

                        <Tooltip id='my-tooltip' place={'right'} style={{ backgroundColor: '#d9212c ', color: 'white', borderRadius: '10px' }} effect='float' events={['click']} />

                    </div>

                    <div className='text-white'>
                        <span>Made with ♥ by <a
                            className='cursor-pointer font-semibold text-redMain' href='https://keinnerross.github.io/portfolioross/' target='_blank'>RossDev</a></span>
                    </div>
                </div>

            </div>
        </div>
    </Fragment>
    )
}

export default SidebarMain;