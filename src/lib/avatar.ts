import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

export function generateAvatar(username: string) {
    return generator.generateRandomAvatar(username);
}
