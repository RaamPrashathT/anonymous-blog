import { AvatarGenerator } from "random-avatar-generator";
import Image from "next/image";
import { useMemo } from "react";

const generator = new AvatarGenerator();

type AvatarImgProps = {
    readonly name : string;
};


export function AvatarImg({ name }: AvatarImgProps) {
    const avatar = useMemo(
        () => generator.generateRandomAvatar(name),
        [name]
    );

    return (
        <Image
            src={avatar}
            alt={`${name}'s avatar`}
            width={28}
            height={28}
            unoptimized
            className="rounded-full"
        />
    );
}
