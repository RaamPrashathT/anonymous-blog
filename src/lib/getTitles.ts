"use server"

import {prisma} from "@/lib/prisma";

export const getTitles = async() => {
    return prisma.blogs.findMany({
        select: {
            id: true,
            title: true,
            likes: true,
            dislikes: true
        },
        orderBy: {
            title: "asc"
        }
    })
}