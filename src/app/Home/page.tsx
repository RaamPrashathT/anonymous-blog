import {getPosts} from "@/app/Home/actions";
import {BlogCard} from "@/components/card/BlogCard";

export default async function HomePage() {

    const posts = await getPosts();

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