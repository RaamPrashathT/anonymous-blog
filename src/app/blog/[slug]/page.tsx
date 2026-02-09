import { getBlogContent } from "@/app/blog/[slug]/actions";
import Image from "next/image";
import { LikeAndDislike } from "@/components/card/LikeAndDislike";
import { AvatarImg } from "@/components/card/AvatarImg";
import { WriteComment } from "@/components/blog-comments/WriteComment";
import { CrepeViewer } from "@/components/crepe/crepeViewer";

interface SlugProps {
    readonly params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: SlugProps) {
    const { slug } = await params;

    const blogContent = await getBlogContent(slug);

    if (blogContent) {
        return (
            <div className="w-full">
                <div className="mx-auto max-w-3xl pt-5 mb-5">
                    <div>
                        <article>
                            <div>
                                <span className="text-xl md:text-4xl font-bold text-gray-900 ">
                                    {blogContent.title}
                                </span>
                                <div className="flex justify-between my-3">
                                    <div className="flex justify-between items-center gap-x-1.5">
                                        <AvatarImg name={blogContent.username} />
                                        <span className="text-lg ">
                                            {blogContent.username}
                                        </span>
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

                            <div className="text-gray-700 leading-relaxed py-4 mt-2 whitespace-pre-wrap">
                                <CrepeViewer content={blogContent.content} className="bg-red-200 p-0"/>
                            </div>
                        </article>
                        <div className="mt-4">
                            <WriteComment blogId={blogContent.id} commentSum={blogContent.comments.length} />
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

    return (
        <div className=" w-full flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                Blog post not found.
            </h1>
        </div>
    )
}
