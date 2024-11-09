import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const setUserData = (userData) => {
    setUser(userData);
  };

  const clearUserData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
