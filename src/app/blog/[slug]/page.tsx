import {getBlogContent} from "@/app/blog/[slug]/actions";
import {LikeButton} from "@/components/card/LikeButton";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

interface SlugProps {
    readonly params: Promise<{ slug: string}>
}

export default async function BlogPost({params} : SlugProps) {
    const { slug } = await  params

    const blogContent = await getBlogContent(slug);

    if(blogContent) {
        return (
            <div className="w-full">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-5 mb-5">
                    <article>
                        <div>
                            <span className="text-5xl font-bold text-gray-900 font-">
                                {blogContent.title}
                            </span>
                            <div className="flex justify-between mt-3">
                                <div className="flex justify-between items-center gap-x-1.5">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="/spy.png"/>
                                    </Avatar>
                                    <span className="text-lg ">{blogContent.username}</span>
                                </div>
                                <LikeButton blogID={blogContent.id} likes={blogContent.likes}/>
                            </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed border-t border-black py-4 mt-2 whitespace-pre-wrap">
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