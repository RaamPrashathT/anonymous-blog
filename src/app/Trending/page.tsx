import {getPosts} from "@/app/Blogs/actions";
import {BlogCard} from "@/components/card/BlogCard";
import {getTrendingPosts} from "@/app/Trending/actions";

export default async function HomePage() {

    const posts = await getTrendingPosts();

    return (
        <div className="container mx-auto px-4 py-6 md:w-[90%] lg:w-[75%] ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        username={post.username}
                        image={post.image}
                    />
                ))}
            </div>
        </div>
    )
}