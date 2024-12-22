import React, { createContext, useState, useEffect } from "react";
import JoblyApi from "../api";
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Decode the token to extract the user information (username)
          const decodedToken = jwtDecode(token);
          const username = decodedToken.username; 
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error decoding token:", err);
          setCurrentUser(null);
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
  
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ currentUser,setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};