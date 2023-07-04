import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { ReactComponent as FeedPng } from "./../../assets/feed.svg";
import { ReactComponent as EstatisticasPng } from "./../../assets/estatisticas.svg";
import { ReactComponent as PostarPng } from "./../../assets/adicionar.svg";
import { ReactComponent as LogoutPng } from "./../../assets/sair.svg";
import Postar from "./postar/Postar";
import Estatisticas from "./estatisticas/Estatisticas";
import Account from "./account/Acoount";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Context } from "../../Context";
import PhotoModal from "../photosViews/PhotoModal";

const Profile = () => {
  const context = React.useContext(Context);

  const id = context.modalId;
  const setId = context.setModalId;

  const [page, setPage] = React.useState("Minha Conta");
  const [mobile, setMobile] = React.useState(false);
  const navTo = useNavigate();
  const [isActiveMobile, setActiveMobile] = React.useState(false);
  useMediaQuery(650, setMobile);

  function toggleMenu() {
    setActiveMobile((e) => !e);
  }

  function logout() {
    localStorage.removeItem("auth");
    navTo("/");
    context.setUserName(null);
  }

  return (
    <main
      className={`container ${styles.main} ${
        mobile && isActiveMobile ? "menuAtivo" : ""
      }`}
    >
      {id && <PhotoModal id={{ id, setId }} />}

      <nav className={styles.flexCenter}>
        <h1 className={styles.title}>{page}</h1>
        {mobile && (
          <label className={styles.menuMobile} onTouchStart={toggleMenu}>
            <span />
          </label>
        )}
        <div className={styles.flexCenter + " " + styles.menu}>
          <NavLink className={styles.navLink} to="" end>
            <FeedPng />
            {mobile && "Minhas Fotos"}
          </NavLink>
          <NavLink className={styles.navLink} to="estatisticas">
            <EstatisticasPng />
            {mobile && "Estastísticas"}
          </NavLink>
          <NavLink className={styles.navLink} to="postar">
            <PostarPng />
            {mobile && <p>Adicionar Foto</p>}
          </NavLink>
          <button className={styles.navLink} onClick={logout}>
            <LogoutPng />
            {mobile && <p>Sair</p>}
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="" element={<Account setPage={setPage} />} />
        <Route
          path="estatisticas"
          element={<Estatisticas setPage={setPage} />}
        />
        <Route path="postar" element={<Postar setPage={setPage} />} />
      </Routes>
    </main>
  );
};

export default Profile;
