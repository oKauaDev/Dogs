import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHead from "../../../hooks/useHead";
import { api } from "../../../services";
import Loading from "../../loading/Loading";
import GridPhoto from "../../photosViews/GridPhoto";
import styles from "./visit.module.css";

const Visit = () => {
  const params = useParams();
  const [photos, setPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navTo = useNavigate();

  if (!params) {
    navTo("/");
  }

  useHead("Dogs | " + params.id);

  React.useEffect(() => {
    if (params.id !== null) {
      setLoading(true);
      api
        .get(`/api/photo?_user=${params.id}`)
        .then(({ data }) => {
          setPhotos(data);
        })
        .finally(() => setLoading(false));
    }
  }, [params]);

  return (
    <div className={`container animeLeft ${styles.height}`}>
      {loading && <Loading />}
      <h1 className={styles.title}>{params.id}</h1>
      <GridPhoto photos={photos} />
    </div>
  );
};

export default Visit;
