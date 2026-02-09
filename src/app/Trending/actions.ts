"use server";

import { prisma } from "@/lib/prisma";

export async function getTrendingPosts(
    page: number = 1,
    limit: number = 10,
    tag: string | null = null,
) {
    const skip = (page - 1) * limit;

    const whereClause = {
        ...(tag && {
            tags: {
                has: tag,
            },
        }),
    };

	

    const [posts, total] = await Promise.all([
        prisma.blogs.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                trendingScore: "desc",
            },
        }),
        prisma.blogs.count({
            where: whereClause,
        }),
    ]);

    return { posts, total };
}
