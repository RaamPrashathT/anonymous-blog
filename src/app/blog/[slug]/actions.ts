import {prisma} from "@/lib/prisma";

export const getBlogContent = async (id: string) => {
    return prisma.blogs.findUnique({
        where:{
            id: id,
        },
        include: {
            comments: true
        }
    })
}