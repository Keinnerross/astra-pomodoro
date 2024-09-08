import styles from '@/styles/componentes/general/user/login.module.css';
import { useRef, useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../../../firebase';

import { doc, getDocs, collection, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { FcGoogle } from 'react-icons/fc';
const UserLogin = ({ isActive, toggleLogin, registerActive, modalRest }) => {
  const [inputMail, setInputMail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [textErrorLog, setTextErrorLog] = useState('');

  const handleLoginData = async (e) => {
    e.preventDefault();

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        inputMail,
        inputPassword
      );
      modalRest();
      window.location.reload();
    } catch (e) {
      setTextErrorLog('Hubo un error al iniciar sessión');
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);

    const userId = userCredentials.user.uid;

    const userRef = collection(db, 'users');
    const snapshot = await getDocs(userRef);

    let users = [];
    snapshot.docs.map((doc) => {
      users.push(doc.id);
    });
    const userResult = users.find((user) => user == userId);

    if (!userResult) {
      const userData = {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
      };

      const collectionRef = collection(db, 'users');
      const docRef = doc(collectionRef, userData.id);

      await setDoc(docRef, {
        email: userData.email,
      });
    }
    window.location.reload();
    modalRest();
  };

  return (
    <div
      className={isActive ? styles.loginContainer : styles.hidden}
      onClick={() => {
        modalRest();
        setTextErrorLog('');
      }}
    >
      <form
        className={`bg-white flex flex-col items-center p-[25px] h-svh w-full md:w-[410px] md:h-[500px] md:rounded-[9px] `}
        onSubmit={(e) => handleLoginData(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={() => toggleLogin()}
          className='w-full text-end !h-0 font-bold cursor-pointer flex justify-end'>
          <span className='text-slate-800 md:hidden '>X</span>
        </div>
        <h2 className='text-slate-800 text-[28px] font-bold pb-[55px] text-center pt-[40px] md:p-0'> Login</h2>




        <div className='w-full '>
          <div className='w-full gap-[10px] flex flex-col'>
            <label>Email</label>
            <input
              className='bg-gray-200 p-[6px] rounded-[7px]'
              placeholder='email'
              type='text'
              onChange={(e) => setInputMail(e.target.value)}
            />
            <label>password</label>
            <input
              className='bg-gray-200 p-[6px] rounded-[7px]'
              placeholder='password'
              type='password'
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <div className='text-center pt-[10px]'>
              <button className={styles.forgotBtn}>Forgot Password?</button>
            </div>
            <span
              className='text-center text-[15px] text-redMain italic'
            >
              {textErrorLog}
            </span>
          </div>
          <div className='flex flex-col gap-[15px]'>
            <button
              type='submit'
              className='bg-slate-800 text-white rounded-[9px] w-full flex gap-[5px] justify-center py-[9px] items-center'>
              Login
            </button>

            <button
              type='button'
              onClick={() => googleLogin()}
              className='bg-slate-200 rounded-[9px] w-full flex gap-[5px] justify-center py-[9px] items-center'
            >
              <FcGoogle /> Google
            </button>
          </div>
        </div>

        {/* <div className='flex flex-col items-center'>
          <span className='!text-slate-800'>|</span>
          <span className='!text-slate-800'>Or</span>
          <span className='!text-slate-800'>|</span>
        </div> */}
        <div className='h-full flex flex-col justify-end items-center pb-[10px]'>
          <label>Do not have at account?</label>
          <button
            type='button'
            onClick={() => {
              registerActive();
              setTextErrorLog('');
            }}
          >
            Create account
          </button>
          {/* <button
            className='hidden md:inline'
            type='button' onClick={() => toggleLogin()}>
            back
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
