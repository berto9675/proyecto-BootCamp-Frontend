import { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout } from "../services/authService";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?.email) {
          const userData = await getCurrentUser(savedUser.email);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al obtener el usuario actual:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);
  

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
