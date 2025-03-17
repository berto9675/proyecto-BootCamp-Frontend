import { useState, useEffect } from "react";
import { getComments, addComment, updateComment, deleteComment } from "../services/CommentService";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaTimesCircle } from "react-icons/fa";
import CommentItem from "./CommentItem";

const CommentModal = ({ resourceId, userId, userEmail, closeModal }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);



  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(resourceId);
      if (!Array.isArray(data)) {
        console.error("⚠ La API devolvió un formato inesperado:", data);
        setComments([]);
      } else {
        setComments(data);
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      setComments([]);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const addedComment = await addComment(resourceId, userId, newComment);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      const updatedComment = await updateComment(commentId, userEmail, content);
      if (updatedComment) {
        setComments((prevComments) =>
          prevComments.map((c) => (c.id === commentId ? { ...c, content } : c))
        );
      }
    } catch (error) {
      console.error("Error al editar comentario:", error);
    }
  };

  const handleDeleteClick = (commentId) => {
    setDeleteCommentId(commentId);
    setShowDeleteModal(true);
  };

  const confirmDeleteComment = async () => {
    if (!deleteCommentId) return;
    try {
      await deleteComment(deleteCommentId, userEmail);
      setComments((prevComments) => prevComments.filter((c) => c.id !== deleteCommentId));
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
    setShowDeleteModal(false); // 🔹 Cierra el modal después de eliminar
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-white border-2 border-[#6A0DAD] p-8 rounded-lg shadow-lg w-[48rem] max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold text-[#4A90E2] flex items-center gap-2 mb-4">
          💬 Comentarios
        </h2>

        <div className="bg-[#D9B2FF] p-4 rounded-lg flex-grow overflow-y-auto max-h-[60vh]">
          <ul className="space-y-3 text-gray-700">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                userId={userId}
                userEmail={userEmail}
                onEdit={handleEditComment}
                onDelete={handleDeleteClick}
              />
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={5}
            className="p-3 border rounded-lg w-full text-lg resize-none"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handleAddComment}
              className="bg-[#FF6600] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#e65c00] flex items-center gap-2"
            >
              <FaPlus /> Agregar
            </button>
            <button
              onClick={closeModal}
              className="bg-[#6A0DAD] text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <FaTimes /> Cerrar
            </button>
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 className="text-xl font-bold text-gray-800">¿Eliminar comentario?</h2>
              <p className="text-gray-600 mt-2">Esta acción no se puede deshacer.</p>
              <div className="mt-4 flex justify-around">
                <button
                  onClick={confirmDeleteComment}
                  className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-red-800"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[#6A0DAD] text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CommentModal;



