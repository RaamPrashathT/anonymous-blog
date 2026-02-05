"use client"

import {JSX, useState} from "react";
import {NavbarButton} from "@/components/navbar/NavbarButton";
import {Menu, X} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuList
} from "@/components/ui/navigation-menu";

import {
    Button
} from "@/components/ui/button";
import { SearchAndFilter } from "@/components/navbar/SearchAndFilter";

const navItems = [
    { label: "Blogs", path: "/Blogs" },
    { label: "Trending", path: "/Trending" },
    { label: "About", path: "/About" },
    { label: "Write", path: "/Write" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo/Brand space (left side) - optional */}
                    <div className="shrink-0 md:w-48">
                        {/* Add your logo here if needed */}
                    </div>

                    {/* Desktop Navigation (center) */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="flex gap-1">
                            {navItems.map((item): JSX.Element => (
                                <NavbarButton
                                    key={item.label}
                                    label={item.label}
                                    path={item.path}
                                />
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Search and Menu Button (right side) */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-48 sm:w-56 md:w-64">
                            <SearchAndFilter/>
                        </div>
                        
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <NavbarButton
                                key={item.label}
                                label={item.label}
                                path={item.path}
                                mobile
                                onClick={() => setIsOpen(false)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}