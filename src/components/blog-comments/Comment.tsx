import { AvatarGenerator } from 'random-avatar-generator';
import Image from "next/image";
import { useState } from "react";
import { CommentLikeAndDislike } from './CommentLikeAndDislikes';

interface CommentProps {
    readonly id: string;
    readonly content: string;
    readonly username: string;
    readonly createdAt: Date;
    readonly likes: number;
    readonly dislikes: number;
}

const generator = new AvatarGenerator();

export function CommentCard({id, content, username, createdAt, likes, dislikes }: CommentProps) {
    const [avatar] = useState<string>(() =>
            generator.generateRandomAvatar(username)
        );
    return (
        <div className="border-b border-gray-200 py-4">
            <div className='flex justify-between'>
            <div className="flex ">
                <div className="flex items-center mr-2">
                {avatar && (
                    <Image
                        src={avatar}
                        alt="avatar"
                        width={30}
                        height={30}
                        unoptimized
                        className="rounded-full"
                    />
                )}
                </div>
                <div className='flex flex-col'>
                    <h3 className="font-semibold">{username}</h3>
                    <p className="text-xs text-gray-500">{createdAt.toLocaleDateString()}</p>
                </div>   
            </div>
            
                    <CommentLikeAndDislike
                        likes={likes}
                        dislikes={dislikes}
                        commentId={id}
                    />
                </div>
            <p className="mt-2 pl-1">{content}</p>
            <div className="mt-2 flex space-x-4">
                
            </div>
        </div>
    )
}