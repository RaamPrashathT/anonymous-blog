import {getPosts} from "@/app/Home/actions";
import {BlogCard} from "@/components/card/BlogCard";

export default async function HomePage() {

    const posts = await getPosts();

    return (
        <div className="pt-2 w-full flex justify-center">
            <div className="  w-[65%] flex justify-between">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        username={post.username}
                    />
                ))}
            </div>
        </div>
    )
}