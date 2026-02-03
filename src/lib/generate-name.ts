import { adjectives, names, uniqueNamesGenerator } from "unique-names-generator";

export default function generateName(): string {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, names],
        separator: " ",
        style: "capital",
    });
}