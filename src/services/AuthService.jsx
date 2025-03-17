import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      { username, email, password },
      { withCredentials: true } 
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error en el registro.");
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user)); 

    return user;
  } catch (error) {
    throw new Error(error.response?.data || "Error en el inicio de sesión.");
  }
};

export const logout = () => {
  localStorage.removeItem("user"); 
};

export const getCurrentUser = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/current-user?email=${encodeURIComponent(email)}`, {
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error al obtener el usuario actual.");
  }
};
