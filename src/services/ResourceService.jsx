import axios from "axios";

const API_URL = "http://localhost:8080/api/resources";

export const getUserResources = async (category, subcategory) => {
  try {
    const response = await axios.get(API_URL, {
      params: { category, subcategory },
      withCredentials: true,
    });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data || "Error al obtener los recursos.");
  }
};

