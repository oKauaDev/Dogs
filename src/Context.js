import React from "react";
import { api } from "./services";

const authUser = ([setUserName, setUserId]) => {
  if (localStorage.auth) {
    api
      .post(
        "/jwt-auth/v1/token/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.auth}`,
          },
        }
      )
      .then(({ data }) => {
        api
          .get("/api/user", {
            headers: {
              Authorization: `Bearer ${localStorage.auth}`,
            },
          })
          .then(({ data }) => {
            setUserName(data.username);
            setUserId(data.id);
          });
      });
  }

  return false;
};

export const Context = React.createContext();

export const Storage = ({ children }) => {
  const [userName, setUserName] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [modalId, setModalId] = React.useState(null);

  const contexts = {
    userName,
    setUserName,
    userId,
    setUserId,
    modalId,
    setModalId,
  };

  React.useEffect(() => {
    authUser([setUserName, setUserId]);
  }, []);

  return <Context.Provider value={contexts}>{children}</Context.Provider>;
};
