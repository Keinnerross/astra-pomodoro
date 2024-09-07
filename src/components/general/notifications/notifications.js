import styles from '../../../styles/componentes/general/notifications/notifications.module.css';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GiAstronautHelmet } from 'react-icons/gi';

const noti = false;

// const noti = false;

const Notifications = ({ isActive, handleActive }) => {
  return (
    <>
      {/***Cierre del modal:*/}
      <div
        className={isActive ? styles.notificationMain : styles.hidden}
        onClick={() => handleActive()}
      ></div>



      <div
        className={`${isActive ? styles.notificationContainer : styles.hidden} w-full h-full fixed top-0 left-0 md:absolute md:w-[380px] md:h-[440px] md:rounded-[9px] md:top-[55px] md:left-auto md:right-[85px]`}>
        <div className={styles.notificationSection}>
          <div
            onClick={() => { handleActive() }}
            className='text-end !h-0 font-bold cursor-pointer p-[25px]'>
            <span className='text-slate-800 md:hidden '>X</span>
          </div>
          <h4 className={styles.headerNotifications}>Notifications</h4>
          <div className={styles.notiRenderContainer}>
            {noti ? (
              noti.map((data, i) => (
                <div
                  key={i}
                  className={styles.cardNotiContainer}>
                  <div className={styles.cardNotiSection}>
                    <div className={styles.iconNoti}>
                      {data.type == 'info' ? (
                        <AiOutlineInfoCircle size={38} />
                      ) : (
                        <GiAstronautHelmet size={38} />
                      )}
                    </div>

                    <div className={styles.infoNotiContainer}>
                      <h4>{data.title}</h4>
                      <p>{data.description}</p>
                      <p>{data.date}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.notiMessageIfEmply}>
                <IoIosNotificationsOutline size={88} fill='gray' />
                <h5>Your notifications will be saved here</h5>
                <span>News, updates or new notification mechanics.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
