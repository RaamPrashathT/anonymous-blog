import {getPosts} from "@/app/Blogs/actions";
import {BlogCard} from "@/components/card/BlogCard";

export default async function Blogs() {

    const posts = await getPosts();

    return (
        <div className="container mx-auto px-4 py-6 md:w-[90%] lg:w-[75%]">
            <h1 className="text-4xl font-bold mb-4">Latest:</h1>
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