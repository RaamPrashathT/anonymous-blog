import { getPosts } from "@/app/Blogs/actions";
import { BlogCard } from "@/components/card/BlogCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Blogs({
    searchParams,
}: {
    readonly searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageParam } = await searchParams;
    const page = Math.max(1, Number(pageParam) || 1);
    const limit = 9;

    const { posts, totalPages } = await getPosts(page, limit);

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

            <div className=" py-6 mt-auto">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={`?page=${Math.max(1, page - 1)}`}
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
                                        href={`?page=${p}`}
                                        isActive={p === page}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href={`?page=${Math.min(totalPages, page + 1)}`}
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
