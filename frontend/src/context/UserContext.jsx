import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem('user'); 
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
