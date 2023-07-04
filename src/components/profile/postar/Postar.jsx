import React from "react";
import useHead from "../../../hooks/useHead";
import { api } from "../../../services";
import Input from "../../input/Input";
import Loading from "../../loading/Loading";
import styles from "./postar.module.css";

const Postar = ({ setPage }) => {
  useHead("Dogs | Postar");

  React.useEffect(() => setPage("Poste Sua Foto"), [setPage]);

  const [loading, setLoading] = React.useState(false);

  const [nome, setNome] = React.useState("");
  const [peso, setPeso] = React.useState(1);
  const [idade, setIdade] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const [isNomeValid, setNomeValid] = React.useState(false);
  const [isPesoValid, setPesoValid] = React.useState(false);
  const [isIdadeValid, setIdadeValid] = React.useState(false);

  function post_photo(event) {
    event.preventDefault();
    if (isNomeValid && isPesoValid && isIdadeValid && photo) {
      setLoading(true);
      const formData = new FormData();
      formData.append("img", photo);
      formData.append("nome", nome);
      formData.append("peso", peso);
      formData.append("idade", idade);

      api
        .post("/api/photo", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.auth,
          },
        })
        .then(({ data }) => {})
        .finally(() => setLoading(false));
    }
  }

  return (
    <div className={styles.inputs + " animeLeft"}>
      {loading && <Loading />}
      <form onSubmit={post_photo}>
        <Input
          label="Nome"
          type="text"
          name="nome"
          setValid={setNomeValid}
          value={nome}
          setValue={setNome}
          required
        />

        <Input
          label="Peso"
          type="number"
          name="peso"
          setValid={setPesoValid}
          value={peso}
          setValue={setPeso}
          required
        />

        <Input
          label="Idade"
          type="number"
          name="idade"
          setValid={setIdadeValid}
          value={idade}
          setValue={setIdade}
          required
        />

        <input
          type="file"
          name="photo"
          style={{ marginBottom: "1rem" }}
          required
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        {loading ? (
          <button disabled className="button">
            Carregando...
          </button>
        ) : (
          <button className="button">Enviar</button>
        )}
      </form>
    </div>
  );
};

export default Postar;
