import styles from "@/styles/componentes/general/user/login.module.css";
import { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { FcGoogle } from "react-icons/fc";
const UserLogin = ({ isActive, toggleLogin, registerActive, modalRest }) => {
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [textErrorLog, setTextErrorLog] = useState("");

  const handleLoginData = async (e) => {
    e.preventDefault();

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        inputMail,
        inputPassword
      );
      modalRest();
    } catch (e) {
      setTextErrorLog("Hubo un error al iniciar sessión");
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);
    const userId = userCredentials.user.uid;
    const userRef = collection(db, "users");
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

      const collectionRef = collection(db, "users");
      const docRef = doc(collectionRef, userData.id);

      await setDoc(docRef, {
        email: userData.email,
      });
    }

    modalRest();
  };

  return (
    <div
      className={isActive ? styles.loginContainer : styles.hidden}
      onClick={() => {
        modalRest();
        setTextErrorLog("");
      }}
    >
      <form
        className={styles.formContainer}
        onSubmit={(e) => handleLoginData(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <h4> Login</h4>

        <div className={styles.formSection}>
          <div>
            <label>Email</label>
            <input
              placeholder="email"
              type="text"
              onChange={(e) => setInputMail(e.target.value)}
            />
            <label>password</label>
            <input
              placeholder="password"
              type="password"
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <div className={styles.forgotBtnContainer}>
              <button className={styles.forgotBtn}>Forgot Password?</button>
            </div>
            <span
              style={{
                textAlign: "center",
                fontSize: "15px",
                color: "red",
                fontStyle: "italic",
              }}
            >
              {textErrorLog}
            </span>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </div>
        <label>Do not have at account?</label>
        <button
          type="button"
          onClick={() => {
            registerActive();
            setTextErrorLog("");
          }}
        >





























          
          Create account
        </button>
        <div className={styles.orContainer}>
          <span>|</span>
          <span>Or</span>
          <span>|</span>
        </div>
        <button
          type="button"
          onClick={() => googleLogin()}
          className={styles.googleBtn}
        >
          <FcGoogle /> Google
        </button>

        <button type="button" onClick={() => toggleLogin()}>
          back
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
