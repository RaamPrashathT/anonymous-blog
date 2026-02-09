"use server"

import { prisma } from "@/lib/prisma";

export const updateDislikeCount = async(id: string, amount: number) => {
    if(amount === 0) {
        return;
    }

    return prisma.blogs.update({
        where: {
            id: id
        },
        data: {
            dislikes: { increment : amount }
        }
    })
}

export const updateCommentDislikeCount = async(id: string, amount: number) => {
    if(amount === 0) {
        return;
    }

    return prisma.comments.update({
        where: {
            id: id
        },
        data: {
            dislikes: { increment : amount }
        }
    })
}