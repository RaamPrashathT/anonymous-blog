"use client"

import React, {useEffect, useRef, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {updateDislikeCount} from "@/lib/dislikes";
import {updateLikeCount} from "@/lib/likes";
import { setTrendingScore } from "@/lib/trendingScore";

interface LikeAndDislikeProps {
    readonly blogId: string;
    readonly likes: number
    readonly dislikes: number
}

export function LikeAndDislike({
    blogId,
    likes,
    dislikes,
}: LikeAndDislikeProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);

    const [isLikeAnimating, setIsLikeAnimating] = useState(false);
    const [isDislikeAnimating, setIsDislikeAnimating] = useState(false);

    const debouncedLikeCount = useDebounce(likeCount, 500);
    const debouncedDislikeCount = useDebounce(dislikeCount, 500);

    const firstLikeRender = useRef(true);
    const firstDislikeRender = useRef(true);
    const lastSyncLikeCount = useRef(likes);
    const lastSyncDislikeCount = useRef(dislikes);

    useEffect(() => {
        const setLikeCount = async() => {
            if(firstLikeRender.current) {
                firstLikeRender.current = false
                return
            }

            const delta = debouncedLikeCount - lastSyncLikeCount.current;

            if(delta !== 0) {
                try {
                    await updateLikeCount(blogId, delta);
                    lastSyncLikeCount.current = debouncedLikeCount
                    
                } catch {
                    console.error("Failed to update like count")
                } finally {
                    await setTrendingScore(blogId)
                }
            }

        }
        

        void setLikeCount()
    }, [blogId, debouncedLikeCount]);

    useEffect(() => {
        const setDislikeCount = async() => {
            if(firstDislikeRender.current) {
                firstDislikeRender.current = false
                return;
            }

            const delta = debouncedDislikeCount - lastSyncDislikeCount.current

            if(delta !== 0) {
                try {
                    await updateDislikeCount(blogId, delta);
                    lastSyncDislikeCount.current = debouncedDislikeCount
                } catch {
                    console.error("Failed to update dislike count");
                } finally {
                    await setTrendingScore(blogId)
                }
            }
        }
        void setDislikeCount()
    }, [blogId, debouncedDislikeCount]);

    const handleDislike = () => {
        if(isLiked) {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
            setIsDisliked(true)
            setDislikeCount(dislikeCount + 1);
        } else {
            setIsDisliked(!isDisliked);
            setDislikeCount(isDisliked ? dislikeCount - 1 : dislikeCount + 1);
        }

        setIsDislikeAnimating(true)
        setTimeout(() => setIsDislikeAnimating(false), 300);
    }

    const handleLike = () => {
        if(isDisliked) {
            setIsDisliked(false);
            setDislikeCount(dislikeCount - 1);
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        } else {
            setIsLiked(!isLiked);
            setLikeCount(isLiked? likeCount -1 : likeCount + 1);

        }
        setIsLikeAnimating(true);
        setTimeout(() => setIsLikeAnimating(false), 300);
    };

    return (
        <div className="flex items-center gap-x-1.5">
            <div className="flex items-center ">
                <button
                    onClick={handleLike}
                    className="group relative flex items-center justify-center p-2 transition-transform active:scale-90"
                    aria-label={isLiked ? "Unlike" : "Like"}
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-all duration-300 cursor-pointer ${
                            isLikeAnimating ? 'scale-125' : 'scale-100'
                        }`}
                    >
                        <path
                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                            fill={isLiked ? "#3b82f6" : "none"}
                            stroke={isLiked ? "#3b82f6" : "#262626"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-all duration-200 ${
                                isLiked ? 'fill-[#3b82f6]' : 'fill-none'
                            }`}
                        />
                    </svg>
                </button>
                <span className="text-lg">
                {likeCount}
            </span>
            </div>
            <div className="flex items-center">
                <button
                    onClick={handleDislike}
                    className="group relative flex items-center justify-center p-2 transition-transform active:scale-90"
                    aria-label={isDisliked ? "Unlike" : "Dislike"}
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-all duration-300 cursor-pointer ${
                            isDislikeAnimating ? 'scale-125' : 'scale-100'
                        }`}
                    >
                        <path
                            d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                            fill={isDisliked ? "#ef4444" : "none"}
                            stroke={isDisliked ? "#ef4444" : "#262626"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-all duration-200 ${
                                isDisliked ? 'fill-[#ef4444]' : 'fill-none'
                            }`}
                        />
                    </svg>
                </button>
                <span className="text-lg">
                {dislikeCount}
            </span>
            </div>
        </div>
    )
}

