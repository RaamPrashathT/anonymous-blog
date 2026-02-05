import {getPosts} from "@/app/Blogs/actions";
import {BlogCard} from "@/components/card/BlogCard"
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default async function Blogs({
     searchParams,
} : {
    readonly searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;

    const rawPage = resolvedSearchParams.page ?? "1";
    const page = Number.parseInt(rawPage, 10);
    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
    const limit = 9

    const { posts, total } = await getPosts(page, limit);
    const totalPages = Math.ceil(total / limit);

    const getVisiblePages = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (safePage === 1) {
            return [1, 2, 3];
        } else if (safePage === totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [safePage - 1, safePage, safePage + 1];
        }
    };

    const visiblePages = getVisiblePages();
    const showLeftEllipsis = visiblePages[0] > 1;
    const showRightEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

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
                            tag={post.tag}
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
                                href={`?page=${Math.max(1, safePage - 1)}`}
                                className={safePage <= 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {showLeftEllipsis && <PaginationEllipsis />}

                        {visiblePages.map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    href={`?page=${p}`}
                                    isActive={p === safePage}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {showRightEllipsis && <PaginationEllipsis />}

                        <PaginationItem>
                            <PaginationNext
                                href={`?page=${Math.min(totalPages, safePage + 1)}`}
                                className={safePage >= totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}