"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { postComment } from "@/lib/comments"
import { useState } from "react"

interface WriteCommentProps {
    readonly blogId: string
}

export function WriteComment({ blogId }: WriteCommentProps) {
    const [comment, setComment] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        setError("")
        const response = await postComment({ blogId, comment });
        if (response.error) {
            setError(response.error);
            return;
        }
        setComment("")
    }

    return (
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
                    <Button variant="secondary" onClick={handleSubmit} disabled={!comment}>Comment</Button>
                </div>
            </div>
        </div>
    )
}
