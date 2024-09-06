import styles from '@/styles/componentes/general/user/register.module.css';
import { useState } from 'react';
import { db } from '../../../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth } from '../../../../firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const UserRegister = ({ isActive, handleActive, modalRest }) => {
  const [inputMail, setInputMail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [validEmail, setValidEmail] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setInputMail(value);
    setValidEmail(validateEmail(value));
  };

  const renderValidateEmail = () => {
    if (validEmail) {
      return null;
    } else if (validEmail == null) {
      return null;
    } else {
      return 'Introduce un email con formato ejemplo@ejemplo.com';
    }
  };

  const handleRegisterData = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        inputMail,
        inputPassword
      );

      const userData = {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
      };

      const collectionRef = collection(db, 'users');
      const docRef = doc(collectionRef, userData.id);

      await setDoc(docRef, {
        email: userData.email,
      });

      modalRest();
    } catch (e) {
      setRegisterError('Email or password no valid');

      /*En este apartado se deben manejar los errores Correctamente. */
    }
  };

  const googleRegister = async () => {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);

    const userId = userCredentials.user.uid;
    // const userId = 'b1nNbozatae0lSd9Lu5sgnDby4P2';

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
        bg: 1,
      };

      const collectionRef = collection(db, 'users');
      const docRef = doc(collectionRef, userData.id);

      await setDoc(docRef, {
        email: userData.email,
      });
    }

    modalRest();
  };


  return (
    <div
      className={isActive ? styles.registerContainer : styles.hidden}
      onClick={() => {
        modalRest();
        setValidEmail(null);
      }}
    >
      <form
        className='flex flex-col bg-white p-[25px] w-full h-full md:w-[410px] md:h-[500px] md:rounded-[9px]'
        onSubmit={(e) => handleRegisterData(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='fadeInQuick h-full'>
          <div
            onClick={() => {
              modalRest();
              setValidEmail(null);
            }}
            className='text-end !h-0 font-bold cursor-pointer'>
            <span className='text-slate-800 md:hidden '>X</span>
          </div>
          <h2 className='text-slate-800 text-[28px] text-center font-bold pb-[65px] pt-[40px] md:p-0'> Register</h2>


          <div className='w-full gap-[10px] flex flex-col'>
            <label>Email</label>
            <input
              className='bg-gray-200 p-[6px] rounded-[7px]'

              placeholder='email'
              type='text'
              onChange={(e) => handleEmailChange(e)}
            />
            <span>{renderValidateEmail()}</span>
            <label>password</label>
            <input
              className='bg-gray-200 p-[6px] rounded-[7px]'
              placeholder='******'
              type='password'
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>

          {registerError}
          <div className='h-full flex flex-col gap-[15px] pt-[25px]'>
            <button
              className='rounded-[9px] bg-slate-800 text-white cursor-pointer py-[9px] text-center '
              type='submit'>Register</button>

            <button
              type='button'
              onClick={() => googleRegister()}
              className='bg-slate-200 rounded-[9px] w-full flex gap-[5px] justify-center py-[9px] items-center'

            >
              <FcGoogle /> Google
            </button>
          </div>


        </div>

        <div className='h-full flex flex-col justify-end items-center pb-[10px]  text-slate-900'>
          <label >Do you have at account?</label>
          <button
            type='button'
            onClick={() => {
              setValidEmail(null);
              handleActive();
            }}
          >
            LogIn
          </button>
        </div>
      </form >
    </div >
  );
};

export default UserRegister;
