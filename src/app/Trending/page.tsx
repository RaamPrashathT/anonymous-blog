import {BlogCard} from "@/components/card/BlogCard";
import {getTrendingPosts} from "@/app/Trending/actions";

export default async function Trending() {

    const posts = await getTrendingPosts();

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        username={post.username}
                    />
                ))}
            </div>
        </div>
    )
}