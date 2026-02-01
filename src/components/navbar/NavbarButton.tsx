import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {JSX} from "react";
import Link from "next/link";

interface NavbarButtonProps {
    readonly label: string;
    readonly path: string;
    readonly mobile?: boolean;
    readonly onClick?: () => void;
}

export function NavbarButton({label, path, mobile, onClick}: NavbarButtonProps): JSX.Element {
    if (mobile) {
        return (
            <Link href={path} onClick={onClick} className="block">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-base font-medium hover:bg-gray-100"
                >
                    {label}
                </Button>
            </Link>
        );
    }

    return (
        <NavigationMenuItem>
            <Link href={path}>
                <Button variant="ghost" className="font-medium">
                    {label}
                </Button>
            </Link>
        </NavigationMenuItem>
    )
}