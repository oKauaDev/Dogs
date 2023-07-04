import React from "react";
import styles from "./header.module.css";
import { ReactComponent as Dogs } from "./../../assets/dogs.svg";
import { ReactComponent as Usuario } from "./../../assets/usuario.svg";
import { NavLink } from "react-router-dom";
import { Context } from "../../Context";

const Header = () => {
  const store = React.useContext(Context);

  return (
    <nav className={styles.nav}>
      <div className="container">
        <NavLink to="/">
          <Dogs />
        </NavLink>

        <NavLink to={store.userName ? "/conta" : "/login"}>
          {store.userName ? <p>{store.userName}</p> : <p>Login / Criar</p>}
          <Usuario />
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
