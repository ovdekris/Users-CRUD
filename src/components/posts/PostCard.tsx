import type {Post} from "../../types/post.ts";

interface PostCardProps {
    post: Post;
    onClick?: () => void;
}

export const PostCard = ({ post, onClick }: PostCardProps) => {
    return (
        <div key={post.id} onClick={onClick} className="group bg-white cursor-pointer rounded-xl p-5  hover:bg-[#0e0eef] hover:z-10 shadow-md transition duration-300">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-white transition duration-300">
                {post.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-3 group-hover:text-white transition duration-300">
                {post.body}
            </p>
        </div>
    );
};
