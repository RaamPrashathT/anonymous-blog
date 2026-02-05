"use client"

import {Card,} from "@/components/ui/card";
import { AvatarGenerator } from 'random-avatar-generator';
import Link from "next/link";
import Image from "next/image";
import {LikeAndDislike} from "@/components/card/LikeAndDislike";
import BadgeComponent from "@/components/card/Badge";
import {useState} from "react";

interface BlogCardProps {
    readonly id: string
    readonly title: string;
    readonly content: string;
    readonly username: string;
    readonly likes: number;
    readonly dislikes: number;
    readonly tag: string;
    readonly image: string;
}

const generator = new AvatarGenerator();

export function BlogCard(blogCardProps: BlogCardProps) {
    const [avatar] = useState<string>(() =>
        generator.generateRandomAvatar(blogCardProps.username)
    );

    return (
        <Card className="border-0 p-0 rounded-lg overflow-hidden shadow-sm grid grid-rows-[auto_1fr_auto] gap-y-0">
            <div>
                <div className="relative h-52 w-full overflow-hidden">
                    <Image
                        src={blogCardProps.image}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="px-2 py-2">
                    <BadgeComponent
                        value={blogCardProps.tag}
                    />
                </div>
            </div>
            <Link
                href={`/blog/${blogCardProps.id}`}
                className="pb-2 px-2 pt-0 flex flex-col gap-y-2 min-h-36"
            >
                <div className="font-semibold text-lg line-clamp-2">
                    {blogCardProps.title}
                </div>
                <p className="whitespace-pre-wrap line-clamp-3">
                    {blogCardProps.content}
                </p>
            </Link>
            <div className="h-16 flex justify-between px-3 ">
                <LikeAndDislike
                    likes={blogCardProps.likes}
                    dislikes={blogCardProps.dislikes}
                    blogId={blogCardProps.id}
                />
                <div className="flex justify-between items-center gap-x-1.5">
                    <span className="text-sm">@{blogCardProps.username}</span>

                    {avatar && (
                        <Image
                            src={avatar}
                            alt="avatar"
                            width={28}
                            height={28}
                            unoptimized
                            className="rounded-full"
                        />
                    )}
                </div>
            </div>
        </Card>
    )
}