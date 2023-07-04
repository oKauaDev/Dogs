import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./photomodal.module.css";
import { ReactComponent as Eye } from "./../../assets/visualizacao-black.svg";
import { ReactComponent as Comment } from "./../../assets/enviar.svg";
import { api } from "../../services";
import Input from "../input/Input";
import Loading from "../loading/Loading";
import { Context } from "../../Context";

const PhotoModal = (dados) => {
  const context = React.useContext(Context);

  const [photo, setPhoto] = React.useState(false);
  const [erro, setErro] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [comment, setComment] = React.useState();
  const [commentValid, setCommentValid] = React.useState();
  const { id } = dados.id;

  const navTo = useNavigate();

  const loadPhoto = React.useCallback(() => {
    setLoading(true);
    api
      .get(`/api/photo/${id}`)
      .then(({ data }) => {
        setPhoto(data);
      })
      .catch(() => setErro("Foto não encontrada"))
      .finally(() => setLoading(false));
  }, [id]);

  React.useEffect(() => {
    loadPhoto();
  }, [loadPhoto]);

  function airClick(event) {
    if (event.target === event.currentTarget) {
      dados.id.setId(null);
    }
  }

  function addComment() {
    if (commentValid) {
      setLoading(true);

      api
        .post(
          `/api/comment/${id}`,
          {
            comment: comment,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.auth,
            },
          }
        )
        .then(({ data }) => {
          loadPhoto();
        })
        .catch(() => setErro("Foto não encontrada"))
        .finally(() => setLoading(false));
    }
  }

  function deletar() {
    api
      .delete(`/api/photo/${photo.photo.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.auth,
        },
      })
      .finally(() => {
        dados.id.setId(null);
        navTo("/");
      });
  }

  return (
    <div className={styles.container} onClick={airClick}>
      {loading && <Loading />}
      {photo ? (
        erro ? (
          <p>{erro}</p>
        ) : (
          <div className={styles.modal + " animeZoom"}>
            <img
              className={styles.image}
              src={photo.photo.src}
              alt={photo.photo.title}
            />
            <div className={styles.info}>
              <div>
                <div
                  className={styles.flex}
                  style={{ marginBottom: ".875rem" }}
                >
                  {photo.photo.author !== context.userName ? (
                    <Link
                      to={`/perfil/${photo.photo.author}`}
                      className={styles.name}
                    >
                      @{photo.photo.author}
                    </Link>
                  ) : (
                    <button onClick={deletar}>Deletar</button>
                  )}
                  <div className={styles.flex}>
                    <Eye className={styles.name} />
                    <p className={styles.name}>{photo.photo.acessos}</p>
                  </div>
                </div>
                <h1 className={styles.title}>{photo.photo.title}</h1>
                <h3>
                  | {photo.photo.peso} kg{"  "}| {photo.photo.idade} anos
                </h3>

                <div className={styles.containerComments}>
                  {photo.comments.map((foto, i) => {
                    return (
                      <p
                        className={styles.comment}
                        key={foto.comment_author + i}
                      >
                        <span>{foto.comment_author}</span>:{" "}
                        {foto.comment_content}
                      </p>
                    );
                  })}
                </div>
                {localStorage.auth && (
                  <div className={styles.addComment}>
                    <Input
                      type="text"
                      name="coment"
                      setValid={setCommentValid}
                      value={comment}
                      setValue={setComment}
                      placeholder="Comente..."
                      displayErro={false}
                      style={{ marginBottom: "none" }}
                    />
                    <Comment onClick={addComment} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default PhotoModal;
