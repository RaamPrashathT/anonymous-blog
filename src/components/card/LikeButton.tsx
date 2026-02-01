"use client"

import React, {JSX, useEffect, useRef, useState} from 'react';
import {useDebounce} from "@/hooks/useDebounce";
import {updateLikeCount} from "@/lib/likes";

interface LikeButtonProps {
    readonly blogID: string;
    readonly likes: number;
}

export function LikeButton({ blogID, likes } : LikeButtonProps): JSX.Element {
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const debouncedLikeCount = useDebounce(likeCount, 500)
    const firstRender = useRef(true);
    const lastSyncLikeCount = useRef(likes);

    useEffect(() => {
        const setLikeCount = async() => {
            if(firstRender.current) {
                firstRender.current = false
                return;
            }

            const delta = debouncedLikeCount - lastSyncLikeCount.current;

            if(delta !== 0) {
                try {
                    await updateLikeCount(blogID, delta);
                } catch {
                    console.error("Failed to update like count");
                }
            }

        }

        void setLikeCount()
    }, [blogID, debouncedLikeCount]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setIsAnimating(true);
        setLikeCount(isLiked? likeCount -1 : likeCount + 1);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <div className="flex items-center gap-x-1">
            <button
                onClick={handleLike}
                className="group relative flex items-center justify-center p-2 transition-transform active:scale-90"
                aria-label={isLiked ? "Unlike" : "Like"}
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-all duration-300 cursor-pointer ${
                        isAnimating ? 'scale-125' : 'scale-100'
                    }`}
                >
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill={isLiked ? "#ed4956" : "none"}
                        stroke={isLiked ? "#ed4956" : "#262626"}
                        strokeWidth="2"
                        className={`transition-all duration-200 ${
                            isLiked ? 'fill-[#ed4956]' : 'fill-none '
                        }`}
                    />
                </svg>
            </button>
            <span className="text-xl">
                {likeCount}
            </span>
        </div>
    );
}