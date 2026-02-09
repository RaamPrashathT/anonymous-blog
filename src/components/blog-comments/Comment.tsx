import { CommentLikeAndDislike } from "./CommentLikeAndDislikes";
import { AvatarImg } from "../card/AvatarImg";

interface CommentProps {
    readonly id: string;
    readonly content: string;
    readonly username: string;
    readonly createdAt: Date;
    readonly likes: number;
    readonly dislikes: number;
}

export function CommentCard({
    id,
    content,
    username,
    createdAt,
    likes,
    dislikes,
}: CommentProps) {
    return (
        <div className="border-b border-gray-200 py-4">
            <div className="flex justify-between">
                <div className="flex ">
                    <div className="flex items-center mr-2">
                        <AvatarImg name={username} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{username}</h3>
                        <p className="text-xs text-gray-500">
                            {createdAt.toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <CommentLikeAndDislike
                    likes={likes}
                    dislikes={dislikes}
                    commentId={id}
                />
            </div>
            <p className="mt-2 pl-1">{content}</p>
            <div className="mt-2 flex space-x-4"></div>
        </div>
    );
}
