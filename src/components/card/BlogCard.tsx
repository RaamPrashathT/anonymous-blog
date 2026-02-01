import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {LikeButton} from "@/components/card/LikeButton";
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar";
import Link from "next/link";

interface BlogCardProps {
    readonly id: string
    readonly title: string;
    readonly content: string;
    readonly username: string;
    readonly likes: number;
}

export function BlogCard(blogCardProps: BlogCardProps) {
    return (
        <Card className="flex flex-col h-64 overflow-hidden p-0 gap-y-0 transition-transform duration-200 hover:scale-101">

            <CardHeader className="h-[20%] flex items-center px-3">
                <p className="text-xl font-bold mr-2 truncate">{blogCardProps.title}</p>
            </CardHeader>
            <CardContent className=" h-[60%] px-3 py-2 flex items-center">
                <Link
                    href={`/blog/${blogCardProps.id}`}
                    className="block h-full cursor-default">
                    <p className="whitespace-pre-wrap line-clamp-5">{blogCardProps.content}</p>
                </Link>
            </CardContent>
            <CardFooter className="h-[20%] flex justify-between px-3 border-t-2  ">
                <LikeButton blogID={blogCardProps.id} likes={blogCardProps.likes} />
                <div className="flex justify-between items-center gap-x-1.5">
                    <span className="text-md ">@{blogCardProps.username}</span>
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="spy.png"/>
                    </Avatar>
                </div>
            </CardFooter>
        </Card>
    )
}