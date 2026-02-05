"use server";

import { prisma } from "@/lib/prisma";

export async function getTrendingPosts(
    page: number = 1,
    limit: number = 10,
    tag: string | null = null
) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
        prisma.blogs.findMany({
            where: {
                ...(tag && { tag }),
            },
            skip,
            take: limit,
            orderBy: {
                likes: "desc",
            },
        }),
        prisma.blogs.count(),
    ]);

    return {
        posts,
        total,
    };
}

export async function getDistinctTags() {
    return prisma.blogs.findMany({
        distinct: ["tag"],
        select: {
            tag: true,
        },
    });
}
