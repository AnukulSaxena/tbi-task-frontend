// Import necessary modules
import React, { createContext, useContext, useState } from "react";

// Create context
const MyContext = createContext(undefined);

// MyContextProvider component
export const MyContextProvider = ({ children }) => {
  // State variables
  const [status, setStatus] = useState(false); // Authentication status
  const [userData, setUserData] = useState(null); // User data

  // Render MyContextProvider with context value
  return (
    <MyContext.Provider value={{ status, setStatus, userData, setUserData }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use MyContext
export const useMyContext = () => {
  // Get context
  const context = useContext(MyContext);

  // Throw error if context is not found
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  // Return context
  return context;
};
