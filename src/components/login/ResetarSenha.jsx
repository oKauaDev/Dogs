import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useHead from "../../hooks/useHead";
import { api } from "../../services";
import Input from "../input/Input";
import styles from "./login.module.css";

const Login = () => {
  useHead("Dogs | Resetar senha");

  const locations = useLocation();
  const params = new URLSearchParams(locations.search);
  const key = params.get("key");
  const login = params.get("login");
  const navTo = useNavigate();

  const [erro, setErro] = React.useState(null);

  const [senha, setSenha] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);

  function mudarSenha(ev) {
    ev.preventDefault();
    if (validPassword) {
      api
        .post("/api/password/reset", {
          login: login,
          password: senha,
          key: key,
        })
        .then(() => {
          setErro(null);
          navTo("/login");
        })
        .catch(() => setErro("Ouve um erro, tente novamente com outro link"));
    }
  }

  return (
    <form className="animeLeft">
      <h1 className={styles.h1}>Recuperação</h1>

      {erro ? (
        <p className={styles.error}>{erro}</p>
      ) : (
        <>
          <Input
            label="Nova senha"
            type="password"
            name="senha"
            setValue={setSenha}
            value={senha}
            setValid={setValidPassword}
            required
          />

          <button className="button" onClick={mudarSenha}>
            Trocar senha
          </button>
        </>
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
