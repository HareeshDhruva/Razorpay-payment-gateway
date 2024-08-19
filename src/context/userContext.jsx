import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const userContexthook = () => {
  return useContext(UserContext);
};

const UserContextProviver = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const myToken = localStorage.getItem("token");
      return myToken ? JSON.parse(myToken) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (authUser) {
        localStorage.setItem("user", JSON.stringify(authUser));
        localStorage.setItem("token", JSON.stringify(token));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error(error);
    }
  }, [authUser]);

  return (
    <UserContext.Provider value={{ authUser, setAuthUser, token, setToken}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProviver;
