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
    readonly tick: number
}

export function CommentSection({ blogId, tick }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        const fetchComments = async () => {
            const comments = await getCommentsByBlogId(blogId)
            setComments(comments)
        }
        console.log(tick)
        void fetchComments();
    }, [blogId, tick])

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