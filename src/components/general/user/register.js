import styles from "@/styles/componentes/general/user/register.module.css";
import { useState } from "react";
import { db } from "../../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../../../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const UserRegister = ({ isActive, handleActive, modalRest }) => {
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

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

      const collectionRef = collection(db, "users");
      const docRef = doc(collectionRef, userData.id);

      await setDoc(docRef, {
        email: userData.email,
      });

      modalRest();
    } catch (e) {
      console.log(e + "Contraseña o Email Inválido.");

      /*En este apartado se deben manejar los errores Correctamente. */
    }
  };

  const googleRegister = async () => {
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
    <div
      className={isActive ? styles.registerContainer : styles.hidden}
      onClick={() => modalRest()}
    >
      <form
        className={styles.formContainer}
        onSubmit={(e) => handleRegisterData(e)}
        onClick={(e) => e.stopPropagation()}
      >
        <h4> Register</h4>

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
        <button type="submit">Register</button>

        <button type="button" onClick={() => googleRegister()}>
          Google
        </button>

        <label>Do you have at account?</label>
        <button type="button" onClick={() => handleActive()}>
          LogIn
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
