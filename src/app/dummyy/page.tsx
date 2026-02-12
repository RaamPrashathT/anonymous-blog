import { getPosts } from "@/app/Blogs/actions";
import { BlogCard } from "@/components/card/BlogCard";

export default async function BlogsDummyy() {
    const {posts} = await getPosts();

    return (
        <div className="flex flex-col w-full">
            <div className="mx-auto max-w-7xl px-4 py-6 ">
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
                            tags={post.tags}
                            image={post.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
