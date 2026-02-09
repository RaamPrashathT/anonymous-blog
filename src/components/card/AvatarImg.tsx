import { generateAvatar } from "@/lib/avatar";
import Image from "next/image";

interface AvatarImgProps {
    readonly name: string;
    readonly size?: number;
}

export function AvatarImg({ name, size = 28 }: AvatarImgProps) {
    return (
        <Image
            src={generateAvatar(name)}
            alt={`${name}'s avatar`}
            width={size}
            height={size}
            unoptimized
            className="rounded-full"
        />
    );
}
