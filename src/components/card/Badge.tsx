import {Badge} from "@/components/ui/badge";

interface BadgeProps {
    readonly value: string[];
}

export default function BadgeComponent({ value }: BadgeProps) {

    const setBadgeColour = (value: string) => {
        if (value === "Tech") return "bg-blue-200 text-blue-900";
        if (value === "Exploration") return "bg-green-200 text-green-900";
        if (value === "Thoughts") return "bg-cyan-200 text-cyan-900";
        if (value === "Food") return "bg-orange-200 text-orange-900";
        if (value === "Driving") return "bg-purple-200 text-purple-900";
        return "gray";
    }
    return (
        <div className="flex mt-1 gap-x-1.5">
            {value.map((tag) => (
                <Badge
                    key={tag}
                    variant="secondary"
                    className={setBadgeColour(tag)}
                >
                    {tag}
                </Badge>
            ))}
        </div>
        
    )
}