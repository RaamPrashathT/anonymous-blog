"use server"

import {prisma} from "@/lib/prisma";

export async function getTrendingPosts() {
    return prisma.blogs.findMany({
        orderBy: {likes: "desc"}
    });
}