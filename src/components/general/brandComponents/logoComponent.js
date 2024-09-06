import styles from '@/styles/componentes/general/brandComponents/logoSpartan.module.css'


const LogoSpartan = () => {
    return (
        // Los Logos se gestionan desde la hoja de estilos de este componente

        <div
            className={`${styles.logoSpartan} w-[130px] md:w-[200px]`}
        ></div>
    )
}

export default LogoSpartan; 