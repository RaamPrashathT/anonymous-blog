import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {LikeButton} from "@/components/card/LikeButton";
import Avatar from 'boring-avatars';
import Link from "next/link";
import {DislikeButton} from "@/components/card/DislikeButton";
import Image from "next/image";
import {LikeAndDislike} from "@/components/card/LikeAndDislike";

interface BlogCardProps {
    readonly id: string
    readonly title: string;
    readonly content: string;
    readonly username: string;
    readonly likes: number;
    readonly dislikes: number;
    readonly image: string;
}

export function BlogCard(blogCardProps: BlogCardProps) {
    return (
        <Card className="flex flex-col border-0 p-0 rounded-lg overflow-hidden shadow-sm gap-y-0">
            <div className=" ">
                <div className="relative h-52 w-full overflow-hidden">
                    <Image
                        src={blogCardProps.image}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="font-semibold h-16 text-lg px-3 py-2 line-clamp-2">{blogCardProps.title}</div>
            </div>
            <Link
                href={`/blog/${blogCardProps.id}`}
                className="h-24 px-3 pt-2 flex items-start "
            >
                    <p className="whitespace-pre-wrap line-clamp-3">{blogCardProps.content}</p>
            </Link>
            <div className="h-16 flex justify-between px-3  ">
                <LikeAndDislike
                    likes={blogCardProps.likes}
                    dislikes={blogCardProps.dislikes}
                    blogId={blogCardProps.id}
                />
                <div className="flex justify-between items-center gap-x-1.5">
                    <span className="text-sm ">@{blogCardProps.username}</span>
                    <Avatar name={blogCardProps.username} variant="marble" size={26}/>
                </div>
            </div>
        </Card>
    )
}