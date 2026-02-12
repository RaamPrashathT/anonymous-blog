import { getTrendingPosts } from "@/app/Trending/actions";
import { BlogCard } from "@/components/card/BlogCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@base-ui/react";
import Link from "next/link";

export default async function TrendingPage({
    searchParams,
}: {
    readonly searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { page: pageParam, tag } = await searchParams;
    const page = Math.max(1, Number(pageParam) || 1);
    const limit = 9;

    const { posts, total } = await getTrendingPosts(page, limit, tag ?? null);
    const totalPages = Math.ceil(total / limit);

    const tagsArray = ["Tech", "Exploration", "Thoughts", "Food", "Driving"];
    const tagQuery = tag ? `&tag=${tag}` : "";

    return (
        <div className="flex flex-col w-full">
            <div className="mx-auto max-w-7xl px-4 py-4 w-full">
                <Link href={`?page=1`}>
                    <Button className="text-3xl font-bold mt-5">
                        Trending Posts:
                    </Button>
                </Link>
                
                <div className="flex items-center flex-wrap">
                    <p className="pr-3 text-xl mt-4 font-bold">Tags:</p>

                    {tagsArray.map((tagObj) => (
                        <Link
                            key={tagObj}
                            href={`?tag=${encodeURIComponent(tagObj)}&page=1`}
                        >
                            <Button className="px-3 py-1 text-xl mt-4 font-bold hover:bg-slate-50 rounded-lg">
                                #{tagObj}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
            

            <div className="mx-auto max-w-7xl px-4 py-6">
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

            <div className="py-6 mt-auto">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={`?page=${Math.max(1, page - 1)}${tagQuery}`}
                                className={
                                    page <= 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>

                        
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1;
                            return (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        href={`?page=${p}${tagQuery}`}
                                        isActive={p === page}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        <PaginationItem>
                            <PaginationNext
                                href={`?page=${Math.min(
                                    totalPages,
                                    page + 1,
                                )}${tagQuery}`}
                                className={
                                    page >= totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
