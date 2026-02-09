"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postComment } from "@/lib/comments";
import { useState } from "react";
import { CommentSection } from "./CommentSection";

interface WriteCommentProps {
    readonly blogId: string;
    readonly commentSum: number
}

export function WriteComment({ blogId, commentSum }: WriteCommentProps) {
    const [comment, setComment] = useState("");
    const [commentSumVal, setCommentSumVal] = useState(commentSum);
    const [error, setError] = useState("");
    const [tick, setTick] = useState(0);

    const handleSubmit = async () => {
        setError("");
        const response = await postComment({ blogId, comment });
        if (response.error) {
            setError(response.error);
            return;
        }
        setComment("");
        setTick((prevTick) => prevTick + 1);
        setCommentSumVal((prevSum) => prevSum + 1);
    };

    return (
        <div>
            <div className="w-full flex justify-between items-center">
                                <h1 className="mb-2 text-xl font-semibold">Comments:</h1>
                                <p className="text-sm text-gray-500">{commentSumVal} {commentSumVal === 1 ? "comment" : "comments"}</p>
                            </div>
            <div className="w-full">
                <Textarea
                    placeholder="Write your comment here..."
                    className="w-full h-18 mb-2 scrollbar-hide"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <div className="w-full flex justify-end">
                    <p className="text-destructive text-sm">{error}</p>
                    <div>
                        <Button
                            variant="ghost"
                            className="mr-3"
                            onClick={() => setComment("")}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleSubmit}
                            disabled={!comment}
                        >
                            Comment
                        </Button>
                    </div>
                </div>
            </div>
            <CommentSection blogId={blogId} tick={tick} />
        </div>
    );
}
