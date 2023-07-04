import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import useHead from "../../hooks/useHead";
import { api } from "../../services";
import Input from "../input/Input";
import styles from "./login.module.css";

const Login = () => {
  const context = React.useContext(Context);

  useHead("Dogs | Login");

  const store = React.useContext(Context);
  const navTo = useNavigate();

  const [error, setError] = React.useState(null);
  const [loadingButton, setLoadingButton] = React.useState(false);

  const [name, setName] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const [validName, setValidName] = React.useState(false);
  const [validSenha, setValidSenha] = React.useState(false);

  function login(ev) {
    ev.preventDefault();
    if (validName && validSenha) {
      setLoadingButton(true);
      api
        .post("/jwt-auth/v1/token", {
          username: name,
          password: senha,
        })
        .then(({ data }) => {
          localStorage.auth = data.token;
          store.setUserName(data.user_nicename);
          setError(null);
          navTo("/conta");
        })
        .catch(() => {
          setError("Dados incorretos");
        })
        .finally(() => setLoadingButton(false));
    }
  }

  return (
    <form className="animeLeft">
      <h1 className={styles.h1}>Login</h1>
      <Input
        label="Usuário"
        type="text"
        name="name"
        setValue={setName}
        value={name}
        setValid={setValidName}
        required
      />

      <Input
        label="Senha"
        type="password"
        name="senha"
        setValue={setSenha}
        value={senha}
        setValid={setValidSenha}
        required
      />

      {!loadingButton ? (
        <button className="button" onClick={login}>
          Entrar
        </button>
      ) : (
        <button className="button" disabled>
          Carregando...
        </button>
      )}

      {error && <p className={styles.error}>{error}</p>}
      <Link className={styles.perdeu} to="perdeu">
        Perdeu a senha ?
      </Link>

      <h1 className={styles.h1} style={{ marginTop: "4rem" }}>
        Cadastre-se
      </h1>
      <p>Ainda não tem uma conta, cadastre-se no site</p>
      <Link className="button" to="criar" style={{ marginTop: "1rem" }}>
        Cadastra-se
      </Link>
    </form>
  );
};

export default Login;
