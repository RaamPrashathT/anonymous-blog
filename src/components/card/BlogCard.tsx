import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

interface BlogCardProps {
    readonly title: string;
    readonly content: string;
    readonly username: string;
}

export function BlogCard(blogCardProps: BlogCardProps) {
    return (
        <Card className="w-80 h-50 flex-col p-0 gap-0 overflow-hidden">
            <CardHeader className=" h-[20%] flex items-center">
                <p>{blogCardProps.title}</p>
            </CardHeader>
            <CardContent className=" h-[55%]">
                <p>{blogCardProps.content}</p>
            </CardContent>
            <CardFooter className=" h-[25%]">
                <p>{blogCardProps.username}</p>
            </CardFooter>
        </Card>
    )
}