"use server"

import {prisma} from "@/lib/prisma";
import { z } from "zod";

type createPostResult =
    | { success: true}
    | { success: false; errors: Record<string, string[]> };

const CreatePostSchema = z.object({
    title: z.string().min(1).max(150),
    content: z.string().min(1),
    username: z.string().min(1).max(20)
})

export async function createPost(
    formData: z.infer<typeof CreatePostSchema>
): Promise<createPostResult> {
    
    const parsed = CreatePostSchema.safeParse(formData);

    if (!parsed.success) {
        const { fieldErrors } = z.flattenError(parsed.error);
        return {
            success: false,
            errors: fieldErrors,
        };
    }

    const { title, content, username } = parsed.data;

    try {
        await prisma.blogs.create({
            data: {
                title,
                content,
                username
            },
        });

        return { success: true };
    } catch(error) {
        console.error(error);
        return {
            success: false,
            errors: {
                form: ["Error creating post"],
            }
        }
    }
}