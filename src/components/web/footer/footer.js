import LogoSpartan from "@/components/general/brandComponents/logoComponent";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

LogoSpartan
const Footer = () => {

    const icon = {
        size: 26
    }


    return (
        <div className="flex justify-center bg-blackPrimary text-white py-[50px]">
            <div className="flex flex-col items-center gap-[18px] ">
                <LogoSpartan />

                <ul className="flex gap-[50px] cursor-pointer">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer"><a>Privacy</a></li>
                    <li className="cursor-pointer"><a>Terms</a></li>
                    <li className="cursor-pointer"><a>Contact</a></li>
                    <li className="cursor-pointer"><a>Version</a></li>
                </ul>
                    <div className="flex justify-between gap-[40px]">
                        <FaGithub size={icon.size} />
                        <FaTwitter size={icon.size} />
                        <RiInstagramFill size={icon.size} />
                    </div>
                <span>Made with ♥ by <a
                    className="cursor-pointer font-semibold text-redMain" href="https://keinnerross.github.io/portfolioross/" target="_blank">RossDev</a> </span>
                <span>©2024</span>


            </div>
        </div>
    )
}

export default Footer;