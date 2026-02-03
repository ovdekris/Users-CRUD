import { useEffect, useState } from "react";
import type { Post } from "../../../types/post.ts";
import type { Comment } from "../../../types/comment.ts";
import { commentService } from "../../../api/services/commentService.ts";
import { Loader } from "../../common/Loader.tsx";

interface CommentsModalProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export const CommentsModal = ({ post, isOpen, onClose }: CommentsModalProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const fetchComments = async () => {
            if (!post) return;

            try {
                setLoading(true);
                setError(null);
                const data = await commentService.getByPostId(post.id);
                setComments(data);
            } catch {
                setError("Comments could not be retrieved");
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && post) {
            fetchComments();
        }
    }, [isOpen, post]);

    if (!post || !isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div role="dialog" aria-labelledby="comments-modal-title" className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h3 id="comments-modal-title" className="text-xl font-semibold text-gray-800 mb-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{post.body}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">
                        Komentarze ({comments.length})
                    </h4>

                    {loading && (
                        <div className="flex justify-center py-8">
                            <Loader />
                        </div>
                    )}

                    {error && (
                        <p className="text-red-500 text-center py-4">{error}</p>
                    )}

                    {!loading && !error && comments.length === 0 && (
                        <p className="text-gray-400 text-center py-4">No comments</p>
                    )}

                    {!loading && !error && (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-gray-800 text-sm">{comment.name}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-2">{comment.email}</p>
                                    <p className="text-gray-700 text-sm">{comment.body}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
