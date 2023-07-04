import styles from "@/styles/componentes/general/user/register.module.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../../firebase";
import { auth } from "../../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

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

  return (
    <div className={isActive ? styles.registerContainer : styles.hidden}>
      <form
        className={styles.formContainer}
        onSubmit={(e) => handleRegisterData(e)}
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

        <button type="button">Google</button>

        <label>Do you have at account?</label>
        <button type="button" onClick={() => handleActive()}>
          LogIn
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
