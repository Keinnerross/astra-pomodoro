import styles from "@/styles/componentes/general/user/login.module.css";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase";

const UserLogin = ({ isActive, toggleLogin, registerActive, modalRest }) => {
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLoginData = async (e) => {
    e.preventDefault();
    const credentials = await signInWithEmailAndPassword(
      auth,
      inputMail,
      inputPassword
    );
    console.log(credentials.user);

    modalRest();
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);
    console.log(userCredentials.user);

    modalRest();
  };

  return (
    <div className={isActive ? styles.loginContainer : styles.hidden}>
      <form
        className={styles.formContainer}
        onSubmit={(e) => handleLoginData(e)}
      >
        <h4> Login</h4>

        <div>
          <label>Email</label>
          <input
            placeholder="email"
            type="text"
            onChange={(e) => setInputMail(e.target.value)}
          />
          <label>password</label>
          <input
            placeholder="******"
            type="password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => googleLogin()}>
          Google
        </button>
        <label>Do not have at account?</label>
        <button type="button" onClick={() => registerActive()}>
          Create account
        </button>

        <button type="button" onClick={() => toggleLogin()}>
          back
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
