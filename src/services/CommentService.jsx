import axios from "axios";

const API_URL = "http://localhost:8080/api/comments";

export const getComments = async (resourceId) => {
  try {
    const response = await axios.get(`${API_URL}/resource/${resourceId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los comentarios");
  }
};

export const addComment = async (resourceId, userId, content) => {
  if (!userId || !resourceId || !content.trim()) {
    throw new Error("Datos incompletos. No se puede agregar el comentario.");
  }

  try {
    const response = await axios.post(API_URL, { resourceId, userId, content });
    return response.data;
  } catch (error) {
    throw new Error("Error al agregar el comentario");
  }
};

export const updateComment = async (commentId, userEmail, newContent) => {
  try {
    const response = await axios.put(`${API_URL}/${commentId}`, null, {
      params: { userEmail, newContent },
    });
    return response.data;
  } catch (error) {    
    throw error;
  }
};

export const deleteComment = async (commentId, userEmail) => {
  try {
    await axios.delete(`${API_URL}/${commentId}`, {
      params: { userEmail },
    });
  } catch (error) {    
    throw new Error("Error al eliminar el comentario");
  }
};















