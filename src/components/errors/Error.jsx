import React from "react";
import useHead from "../../hooks/useHead";
import styles from "./error.module.css";

const Error = () => {
  useHead("Dogs | Erro404");
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>Erro 404</h1>
      <p>Pádina não existe</p>
    </div>
  );
};

export default Error;
