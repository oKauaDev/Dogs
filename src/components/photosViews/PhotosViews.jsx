import React from "react";
import { Context } from "../../Context";
import useHead from "../../hooks/useHead";
import Loading from "../loading/Loading";
import GridPhoto from "./GridPhoto";
import PhotoModal from "./PhotoModal";
import styles from "./photoviews.module.css";

const PhotosViews = () => {
  useHead("Dogs");

  const context = React.useContext(Context);

  const id = context.modalId;
  const setId = context.setModalId;

  const [photo, setPhotos] = React.useState({});
  // eslint-disable-next-line no-unused-vars
  const [pages, setPages] = React.useState(1);
  const [exitLoading, setExitLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const loadPhoto = React.useCallback((page) => {
    setLoading(true);
    fetch(`https://dogsapi.origamid.dev/json/api/photo?_page=${page}`)
      .then((r) => r.json())
      .then((r) => {
        const page_name = "page" + page;
        if (r.length === 0) {
          setExitLoading(true);
        } else {
          setPhotos((photo) => ({
            ...photo,
            [page_name]: r,
          }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const load = React.useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 32
    ) {
      setPages((p) => {
        loadPhoto(p + 1);
        return p + 1;
      });
    }
  }, [loadPhoto]);

  React.useEffect(() => {
    loadPhoto(1);
    window.addEventListener("scroll", load);
  }, [loadPhoto, load]);

  if (exitLoading) {
    window.removeEventListener("scroll", load);
  }

  const pageskeys = Object.keys(photo);

  return (
    <main className={styles.main + " container"}>
      {loading && <Loading />}
      {id && <PhotoModal id={{ id, setId }} />}
      {pageskeys.map((pagekey) => {
        return <GridPhoto key={pagekey} photos={photo[pagekey]} />;
      })}
      {exitLoading && (
        <p className={styles.finishPages}>Não existem mais postagens.</p>
      )}
    </main>
  );
};

export default PhotosViews;
