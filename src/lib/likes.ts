"use server"

import { prisma } from "@/lib/prisma";

export const updateLikeCount = async(id: string, amount: number) => {
    if(amount === 0) {
        return;
    }

    return prisma.blogs.update({
        where: {
            id: id
        },
        data: {
            likes: { increment : amount }
        }
    })
}