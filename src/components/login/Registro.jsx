import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import useHead from "../../hooks/useHead";
import { api } from "../../services";
import Input from "../input/Input";
import styles from "./login.module.css";

const Login = () => {
  useHead("Dogs | Registrar");

  const store = React.useContext(Context);
  const navTo = useNavigate();

  const [error, setError] = React.useState(null);
  const [loadingButton, setLoadingButton] = React.useState(false);

  const [name, setName] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [validName, setValidName] = React.useState(false);
  const [validSenha, setValidSenha] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(false);

  function registrase(ev) {
    ev.preventDefault();
    if (validName && validSenha && validEmail) {
      setLoadingButton(true);
      api
        .post("/api/user", {
          username: name,
          password: senha,
          email: email,
        })
        .then(() => {
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
            .catch(() => setError("Erro ao realizar o login"))
            .finally(() => setLoadingButton(false));
        })
        .catch(() => {
          setError("Já existe uma conta com esse email/usuário");
          setLoadingButton(false);
        });
    }
  }

  return (
    <form className="animeLeft">
      <h1 className={styles.h1}>Cadastre-se</h1>
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
        label="Email"
        type="email"
        name="email"
        setValue={setEmail}
        value={email}
        setValid={setValidEmail}
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
        <button className="button" onClick={registrase}>
          Cadastra-se
        </button>
      ) : (
        <button className="button" disabled>
          Carregando...
        </button>
      )}

      {error && <p className={styles.error}>{error}</p>}
      <h1 className={styles.h1} style={{ marginTop: "4rem" }}>
        Login
      </h1>
      <p>Já tem uma conta ?</p>
      <Link className="button" to="/login" style={{ marginTop: "1rem" }}>
        Logar-se
      </Link>
    </form>
  );
};

export default Login;
