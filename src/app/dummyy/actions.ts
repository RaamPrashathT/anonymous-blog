"use server"

import {prisma} from "@/lib/prisma";


export const getPostsDummy = async () => {
    return prisma.blogs.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}