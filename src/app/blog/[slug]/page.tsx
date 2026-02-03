import {getBlogContent} from "@/app/blog/[slug]/actions";
import {LikeButton} from "@/components/card/LikeButton";
import Avatar from "boring-avatars";
import Image from "next/image";
import {DislikeButton} from "@/components/card/DislikeButton";
import {LikeAndDislike} from "@/components/card/LikeAndDislike";

interface SlugProps {
    readonly params: Promise<{ slug: string}>
}

export default async function BlogPost({params} : SlugProps) {
    const { slug } = await params

    const blogContent = await getBlogContent(slug);

    if(blogContent) {
        return (
            <div className="w-full">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-5 mb-5">
                    <article>
                        <div>
                            <span className="text-xl md:text-4xl font-bold text-gray-900 ">
                                {blogContent.title}
                            </span>
                            <div className="flex justify-between my-3">
                                <div className="flex justify-between items-center gap-x-1.5">
                                    <Avatar name={blogContent.username} variant="marble" size={30}/>
                                    <span className="text-lg ">{blogContent.username}</span>
                                </div>
                                <LikeAndDislike
                                    likes={blogContent.likes}
                                    dislikes={blogContent.dislikes}
                                    blogId={blogContent.id}
                                />
                            </div>
                        </div>
                        <div className="relative h-96 w-full overflow-hidden rounded-lg">
                            <Image
                                src={blogContent.image}
                                alt="thumbnail"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <p className="text-gray-700 leading-relaxed py-4 mt-2 whitespace-pre-wrap">
                            {blogContent.content}
                        </p>
                    </article>
                </div>
            </div>
        )
    }

    return (
        <div>nothing to see here</div>
    )
}