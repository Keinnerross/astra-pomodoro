import styles from "@/styles/componentes/general/user/login.module.css";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase";
import { getDoc, doc, getDocs, collection, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

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

    const userId = userCredentials.user.uid;
    // const userId = "b1nNbozatae0lSd9Lu5sgnDby4P2";

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
