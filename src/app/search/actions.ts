"use server"

import {prisma} from "@/lib/prisma";

interface FetchFilterBlogsProps {
    keyword: string ;
    filter: string ;
}

export async function fetchFilteredBlogs({keyword, filter}: FetchFilterBlogsProps) {
     return prisma.blogs.findMany({
        where: {
            title: {
                contains: keyword,
                mode: "insensitive"
            }
        },
        orderBy: {
            ...(filter === "mostLiked" ? {likes: "desc"} : {}),
            ...(filter === "mostDisliked" ? {dislikes: "desc"} : {})
        }
    })
}