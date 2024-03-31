import React, { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext(undefined);

export const MyContextProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  return (
    <MyContext.Provider value={{ status, setStatus, userData, setUserData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
