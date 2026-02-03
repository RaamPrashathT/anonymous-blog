"use server"

import {prisma} from "@/lib/prisma";

export async function getPosts() {
    return prisma.blogs.findMany({
        orderBy: {createdAt: "desc"}
    });
}