'use client'

import {useSearchParams} from 'next/navigation'
import {BlogCard} from "@/components/card/BlogCard";
import {fetchFilteredBlogs} from "@/app/search/actions";
import {useEffect, useState, Suspense} from "react";

interface BlogCardProps {
    readonly id: string
    readonly title: string;
    readonly content: string;
    readonly username: string;
    readonly likes: number;
    readonly dislikes: number;
    readonly tags: string[];
    readonly image: string;
}

function SearchContent() {
    const searchParams = useSearchParams()
    const keyword = searchParams.get('keyword') ?? "";
    const filter = searchParams.get('filter') ?? "none";
    const [posts, setPosts] = useState<BlogCardProps[] | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const result = await fetchFilteredBlogs({keyword, filter});
            setPosts(result);
        }
        void fetchBlogs();
    }, [keyword, filter]);


    return (
        <div className="mx-auto max-w-7xl px-4 py-6 ">
            {posts ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        username={post.username}
                        tags={post.tags}
                        image={post.image}
                    />
                ))}
            </div>
                :
            <p>nothing</p>
            }
        </div>
    )
}

export default function Search() {
    return (
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-6">Loading...</div>}>
            <SearchContent />
        </Suspense>
    )
}