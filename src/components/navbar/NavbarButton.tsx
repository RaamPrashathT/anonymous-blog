import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {JSX} from "react";

interface NavbarButtonProps {
    readonly label: string
}

export function NavbarButton({label}: NavbarButtonProps): JSX.Element {
    return (
        <NavigationMenuItem>
            <Button>{label}</Button>
        </NavigationMenuItem>
    )
}