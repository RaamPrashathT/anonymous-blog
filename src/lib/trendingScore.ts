"use server";
import { prisma } from "./prisma";

export async function setTrendingScore(
    incomingId: string,
    mode: string = "blog",
) {
    let blogId: string;

    if (mode === "comment") {
        const comment = await prisma.comments.findUnique({
            where: {
                id: incomingId,
            },
            select: {
                blogId: true,
            },
        });

        if (!comment?.blogId) return;
        blogId = comment.blogId;
    } else {
        blogId = incomingId;
    }

    const result = await prisma.blogs.findUnique({
        where: {
            id: blogId,
        },
        select: {
            likes: true,
            dislikes: true,
            createdAt: true,
        },
    });

    if (!result) {
        return;
    }

    const netLikes = result.likes - result.dislikes;

    const sumComment = await prisma.comments.aggregate({
        where: {
            blogId: blogId,
        },
        _sum: {
            likes: true,
            dislikes: true,
        },
    });

    const netComments =
        (sumComment._sum.likes ?? 0) - (sumComment._sum.dislikes ?? 0);

    const trendingScore = netLikes + netComments * 0.3;

    await prisma.blogs.update({
        where: {
            id: blogId,
        },
        data: {
            trendingScore: trendingScore,
        },
    });
}
