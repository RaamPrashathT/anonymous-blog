"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import generateName from "@/lib/generate-name";

const createBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    imageUrl: z.string(),
    tag: z.string()
});

export const createPost = async (
    input: z.infer<typeof createBlogSchema>
) => {
    const parsed = createBlogSchema.safeParse(input);

    if(!parsed.success) {
        return {
            success: false,
            error: "Parsing error. Enter valid Title and content"
        }
    }

    const { title, content, imageUrl, tag } = parsed.data;
    const username = generateName()

    try {
        await prisma.blogs.create({
            data: {
                title: title,
                content: content,
                image: imageUrl,
                username: username,
                tag: tag,
            },
        })

        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            error: `Could not create post: ${error}`,
        }
    }
}