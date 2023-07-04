import React from "react";
import { Context } from "../../../Context";
import useHead from "../../../hooks/useHead";
import { api } from "../../../services";
import GridPhoto from "../../photosViews/GridPhoto";
import styles from "./account.module.css";

const Account = ({ setPage }) => {
  useHead("Dogs | Sua conta");

  React.useEffect(() => setPage("Conta"), [setPage]);

  const [photos, setPhotos] = React.useState([]);

  const context = React.useContext(Context);

  React.useEffect(() => {
    if (context.userId !== null) {
      api.get(`/api/photo?_user=${context.userId}`).then(({ data }) => {
        setPhotos(data);
      });
    }
  }, [context]);

  return (
    <div className={styles.container + " animeLeft"}>
      <GridPhoto photos={photos} />
    </div>
  );
};

export default Account;
