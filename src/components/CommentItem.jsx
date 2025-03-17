import { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimesCircle } from "react-icons/fa";

const CommentItem = ({ comment, userId, userEmail, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    return (
        <li className="bg-white p-3 rounded-md shadow-md flex flex-col gap-2 text-sm w-full">
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="p-2 border rounded w-full text-sm resize-none"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                onEdit(comment.id, editContent);
                                setIsEditing(false);
                            }}
                            className="text-green-600 hover:text-green-800"
                        >
                            <FaCheck size={16} />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-gray-800">
                            <FaTimesCircle size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <span className="flex-1 text-gray-800 whitespace-pre-line">{comment.content}</span>         

                    {comment.user?.id === userId && (
                        <div className="flex gap-2">
                            <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800">
                                <FaEdit size={16} />
                            </button>
                            <button onClick={() => onDelete(comment.id)} className="text-red-600 hover:text-red-800">
                                <FaTrash size={16} />
                            </button>

                        </div>
                    )}
                </div>
            )}
        </li>
    );
};

export default CommentItem;

