import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../../types/post.ts";
import type { User } from "../../types/user.ts";
import { postService } from "../../api/services/postService.ts";
import { UserService } from "../../api/services/userService.ts";
import { PostHeader } from "./PostHeader.tsx";
import { Loader } from "../common/Loader.tsx";
import { ErrorMessage } from "../common/ErrorMessage.tsx";
import { PostCard } from "./PostCard.tsx";
import { CommentsModal } from "./modals/CommentsModal.tsx";
import { useModal } from "../../hooks/useModal.ts";

export const PostList = () => {
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);

    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const commentsModal = useModal();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [postsData, userData] = await Promise.all([
                    postService.getByUserId(userId),
                    UserService.getById(userId),
                ]);
                setPosts(postsData);
                setUser(userData);
            } catch (err) {
                setError("Nie udało się pobrać postów");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <>
            <PostHeader userName={user?.name} />
            <div className="bg-[#faf5f0] min-h-screen">
                <div className="max-w-[1440px] mx-auto p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {posts.map((post) => (
                           <PostCard key={post.id} post={post} onClick={() => commentsModal.open(post)} />
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center text-gray-500 py-10">
                           No post's found
                        </div>
                    )}
                </div>
            </div>

            <CommentsModal
                post={commentsModal.modalData}
                isOpen={commentsModal.isOpen}
                onClose={commentsModal.close}
            />
        </>
    );
};
