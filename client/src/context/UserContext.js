import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  function setToken(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  }

  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    return JSON.parse(tokenString);
  }

  return (
    <UserContext.Provider value={{ setToken, getToken }}>
      {props.children}
    </UserContext.Provider>
  );
};
