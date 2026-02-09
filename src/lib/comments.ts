"use server"

import generateName from "@/lib/generate-name";
import { prisma } from "./prisma"
import { z } from "zod";

const createCommentSchema = z.object({
    blogId: z.string().min(1, "Blog ID is required"),
    comment: z.string().min(1, "Comment is required")
})


export const postComment = async (
    input: z.infer<typeof createCommentSchema>
) => {

    const parsed = createCommentSchema.safeParse(input);

    if(!parsed.success) {
        return {
            success: false,
            error: "Parsing error. Enter valid Blog ID and Comment"
        }
    }

    const username = generateName()
    
    const { blogId, comment } = parsed.data;
    
    try {
        await prisma.comments.create({
            data: {
                blogId: blogId,
                content: comment,
                username: username
            }
        })

        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            error: `Could not create comment: ${error}`
        }
    }


}

export const getCommentsByBlogId = async (blogId: string) => {
    return prisma.comments.findMany({
        where: {
            blogId: blogId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}