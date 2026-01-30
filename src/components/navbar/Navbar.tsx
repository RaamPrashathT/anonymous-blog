import {
    NavigationMenu,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import {NavbarButton} from "@/components/navbar/NavbarButton";
import {JSX} from "react";

const navItems = [
    { label: "Home" },
    { label: "Trending" },
    { label: "About" },
    { label: "Write" },
]

export function Navbar() {
    return (
        <nav className="" >
            <NavigationMenu className="w-full">
                <NavigationMenuList>
                    {navItems.map((item: { label :string }): JSX.Element => (
                        <NavbarButton key={item.label} label={item.label}/>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </nav>

    )
}