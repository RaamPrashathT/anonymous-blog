"use server"

import {prisma} from "@/lib/prisma";

interface FormData {
    title: string
    content: string
    username: string
}

export async function createPost(formData: FormData) {
    const title = formData.title
    const content = formData.content
    const username = formData.username

    console.log(`SERVER: ${title} - ${content} - ${username}`)

    await prisma.blogs.create({
        data: {
            title,
            content,
            username
        }
    })
}