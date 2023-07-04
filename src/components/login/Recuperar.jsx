import React from "react";
import { Link } from "react-router-dom";
import useHead from "../../hooks/useHead";
import { api } from "../../services";
import Input from "../input/Input";
import styles from "./login.module.css";

const Login = () => {
  useHead("Dogs | Recuperar senha");

  const [email, setEmail] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [sended, setSended] = React.useState(false);

  function recuperar(ev) {
    ev.preventDefault();
    if (validEmail) {
      api
        .post("/api/password/lost", {
          login: email,
          url: `${window.location.origin}/login/resetar`,
        })
        .then(({ data }) => {
          setSended(true);
        });
    }
  }

  return (
    <form className="animeLeft">
      <h1 className={styles.h1}>Recuperação</h1>
      {sended ? (
        <p className={styles.success}>Email de recuperação enviado</p>
      ) : (
        <Input
          label="Email/Nome"
          type="text"
          name="email"
          setValue={setEmail}
          value={email}
          setValid={setValidEmail}
          required
        />
      )}

      {sended ? (
        <button className="button" disabled>
          Email enviado
        </button>
      ) : (
        <button className="button" onClick={recuperar}>
          Enviar E-mail
        </button>
      )}

      <h1 className={styles.h1} style={{ marginTop: "4rem" }}>
        Logar-se
      </h1>
      <p>Lembrou a sua senha ?</p>
      <Link className="button" to="/login" style={{ marginTop: "1rem" }}>
        Logar-se
      </Link>
    </form>
  );
};

export default Login;
