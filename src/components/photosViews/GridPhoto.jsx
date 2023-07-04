import React from "react";
import { Context } from "../../Context";
import styles from "./photoviews.module.css";

const GridPhoto = ({ photos }) => {
  const context = React.useContext(Context);
  const setId = context.setModalId;

  return (
    <>
      <section className={styles.photoview}>
        {photos.map((photo, i) => {
          return (
            <div
              className={
                styles.wrapper + " " + (i === 2 ? styles.photoBig : "")
              }
              key={photo.id}
              onClick={() => setId(photo.id)}
            >
              <img src={photo.src} alt={photo.title} />
              <div className={styles.containerViews}>
                <span>{photo.acessos}</span>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default GridPhoto;
