import { getTrendingPosts, getDistinctTags } from "@/app/Trending/actions";
import { BlogCard } from "@/components/card/BlogCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
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
    const resolvedSearchParams = await searchParams;

    const rawPage = resolvedSearchParams.page ?? "1";
    const page = Number.parseInt(rawPage, 10);
    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
    const limit = 9;

    const tag = resolvedSearchParams.tag ?? null;

    const { posts, total } = await getTrendingPosts(page, limit, tag);
    const totalPages = Math.ceil(total / limit);

    const tagsArray = await getDistinctTags();
    const distinctTags = tagsArray.map((tagObj) => tagObj.tag);

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
            <div className="mx-auto max-w-7xl px-4 py-4 w-full">
                <Button 
                    className="text-3xl font-bold mt-5 ">
                    <Link href={`?page=1`}>
                        Trending Posts:
                    </Link>
                </Button>
                <div className="flex items-center">
                <p className="pr-3 text-xl mt-4  font-bold">Tags:</p>
                { distinctTags.length > 0 ? 
                    tagsArray.map((tagObj) => (
                        <Button
                            key={tagObj.tag}
                            className="px-3 py-1 text-xl mt-4  font-bold hover:bg-slate-50 rounded-lg"
                        >
                            <Link href={`?tag=${encodeURIComponent(tagObj.tag)}&page=1`}>
                                #{tagObj.tag}
                            </Link>
                        </Button>
                    ))
                    :
                        null
                }
                </div>
            </div>
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
                                className={
                                    safePage <= 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
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
                                className={
                                    safePage >= totalPages
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



