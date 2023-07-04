import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import login from "./../../assets/login.jpg";
import Login from "./Login";
import Registro from "./Registro";
import ResetarSenha from "./ResetarSenha";
import Recuperar from "./Recuperar";
import styles from "./login.module.css";
import { Context } from "../../Context";

const Auths = () => {
  const store = React.useContext(Context);
  const navTo = useNavigate();

  if (store.userName) {
    navTo("/conta");
  }

  return (
    <main className={styles.main}>
      <img className={styles.bigAuthImage} src={login} alt="login" />
      <div className={styles.campsArea}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="criar" element={<Registro />} />
          <Route path="perdeu" element={<Recuperar />} />
          <Route path="resetar" element={<ResetarSenha />} />
        </Routes>
      </div>
    </main>
  );
};

export default Auths;
