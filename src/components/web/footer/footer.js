import LogoSpartan from '@/components/general/brandComponents/logoComponent';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip'

LogoSpartan
const Footer = () => {

    const icon = {
        size: 26
    }


    return (
        <div className='flex justify-center bg-blackPrimary text-white py-[50px]'>
            <div className='flex flex-col items-center gap-[18px] '>
                <LogoSpartan />

                <ul className='flex flex-wrap justify-center gap-[5px] md:gap-[50px] cursor-pointer'>
                    <a href='/'><li className='cursor-pointer'>Home</li></a>

                    <a href='https://keinnerross.github.io/portfolioross/' target='_blank'> <li className='cursor-pointer'>Contact</li></a>
                    <li data-tooltip-id='version' data-tooltip-content='beta 1.0' className='cursor-pointer'>Version</li>



                    <Tooltip id='version' place={'top'} style={{ backgroundColor: '#d9212c ', color: 'white', borderRadius: '10px' }} effect='float' events={['click']} />


                </ul>
                <div className='flex justify-between gap-[40px]'>
                    <a href='https://github.com/Keinnerross/spartan-pomodoro' target='_blank'><FaGithub size={icon.size} /></a>
                    <a href='https://x.com/keinnerross' target='_blank'><FaTwitter size={icon.size} /></a>
                    <a href='https://www.instagram.com/keinnerross/' target='_blank'>  <RiInstagramFill size={icon.size} /></a>
                </div>
                <span>Made with ♥ by <a
                    className='cursor-pointer font-semibold text-redMain' href='https://keinnerross.github.io/portfolioross/' target='_blank'>RossDev</a> </span>
                <span>©2024</span>


            </div>
        </div>
    )
}

export default Footer;