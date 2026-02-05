"use server"

import {prisma} from "@/lib/prisma";


export const getPosts = async (page: number = 1, limit: number = 10 ) => {
    const skip = ( page - 1 ) * limit;

    const [posts, total] = await Promise.all([
         prisma.blogs.findMany({
             skip,
             take: limit,
             orderBy: {
                 createdAt: "desc"
             }
         }),
        prisma.blogs.count()
    ])

    return {
        posts,
        total
    }
}