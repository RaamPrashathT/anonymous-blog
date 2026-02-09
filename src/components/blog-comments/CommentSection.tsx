"use client"

import { getCommentsByBlogId } from "@/lib/comments";
import { useEffect, useState } from "react";
import { CommentCard } from "./Comment";

type Comment = {
    id: string;
    blogId: string;
    content: string;
    username: string;
    likes: number;
    dislikes: number;
    createdAt: Date;
}

interface CommentSectionProps {
    readonly blogId: string
}

export function CommentSection({ blogId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        const fetchComments = async () => {
            const comments = await getCommentsByBlogId(blogId)
            setComments(comments)
        }
        void fetchComments();
    }, [blogId])

    return (
        <div>
            {comments.map((comment) => (
                <CommentCard 
                    key={comment.id} 
                    id={comment.id}
                    content={comment.content}
                    username={comment.username}
                    createdAt={comment.createdAt}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                />
            ))}
        </div>
    )
}