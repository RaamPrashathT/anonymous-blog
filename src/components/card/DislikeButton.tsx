"use client"

import React, {JSX, useEffect, useRef, useState} from 'react';
import {useDebounce} from "@/hooks/useDebounce";
import {updateDislikeCount} from "@/lib/dislikes";

interface DislikeButtonProps {
    readonly blogID: string;
    readonly dislikes: number;
}

export function DislikeButton({ blogID, dislikes } : DislikeButtonProps): JSX.Element {
    const [isDisliked, setIsDisliked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [dislikeCount, setDislikeCount] = useState(dislikes);
    const debouncedDislikeCount = useDebounce(dislikeCount, 500)
    const firstRender = useRef(true);
    const lastSyncDislikeCount = useRef(dislikes);

    useEffect(() => {
        const setDislikeCount = async() => {
            if(firstRender.current) {
                firstRender.current = false
                return;
            }

            const delta = debouncedDislikeCount - lastSyncDislikeCount.current;

            if(delta !== 0) {
                try {
                    await updateDislikeCount(blogID, delta);
                } catch {
                    console.error("Failed to update dislike count");
                }
            }

        }

        void setDislikeCount()
    }, [blogID, debouncedDislikeCount]);

    const handleDislike = () => {
        setIsDisliked(!isDisliked);
        setIsAnimating(true);
        setDislikeCount(isDisliked? dislikeCount -1 : dislikeCount + 1);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
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
                        isAnimating ? 'scale-125' : 'scale-100'
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
    );
}