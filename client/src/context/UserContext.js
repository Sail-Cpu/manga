import React, { createContext, useState } from "react";

export const UserContext = createContext(undefined);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  function setToken(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  }

  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setUser(userToken.data);
    return userToken;
  }

  return (
    <UserContext.Provider value={{ setToken, getToken, user }}>
      {props.children}
    </UserContext.Provider>
  );
};
