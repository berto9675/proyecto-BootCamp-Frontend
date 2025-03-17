
import CommentItem from "./CommentItem";

const CommentList = ({ comments, userId, userEmail, onEdit, onDelete }) => {
    return (
        <div className="bg-[#D9B2FF] p-4 rounded-lg max-h-60 overflow-y-auto">
            <ul className="space-y-2 text-gray-700">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            userId={userId}
                            userEmail={userEmail}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No hay comentarios aún.</p>
                )}
            </ul>
        </div>
    );
};

export default CommentList;
