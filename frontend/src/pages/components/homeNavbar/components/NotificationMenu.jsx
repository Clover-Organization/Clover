import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { isEmpty } from "lodash";
import { User } from "lucide-react";

const components = [
    {
        title: "Alert Dialog",
        to: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        to: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        to: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        to: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        to: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        to: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function NotificationMenu({ userData, idProject, shareUsers }) {
    const navigate = useNavigate('/')
    const [isShareUser, setIsShareUser] = useState(false);

    useEffect(() => {
        if (shareUsers !== undefined && Array.isArray(shareUsers) && shareUsers.length > 0) {
            // Verifica se o usuário compartilhou
            const hasShared = shareUsers.some(element => element.idUsers === userData.idUsers);
            setIsShareUser(hasShared);
        }
    }, [shareUsers, userData.idUsers]);

    localStorage.setItem("shareUser", isShareUser);

    const handleLogouUser = () => {
        toast.success("Sucess!", {
            description: "Logout Successfully!",
        });
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/welcome');
    }
    return (
        <NavigationMenu className="hidden md:flex md:w-[900px]">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent >
                        <ul className="grid gap-3 p-4 md:w-[380px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        to={`/settings`}
                                    >
                                        <div className="mb-2 w-36 mt-4 text-lg font-medium">
                                            {userData.profileImage != null && !isEmpty(userData.profileImage) ? (
                                                <img
                                                    width={110}
                                                    className="rounded-full h-28 object-cover"
                                                    src={
                                                        userData.profileImage
                                                            ? `data:image/png;base64,${userData.profileImage}`
                                                            : "null"
                                                    }
                                                    alt="userImage"
                                                />
                                            ) : (
                                                <User className="w-24 h-24"/>
                                            )}
                                        </div>
                                        <span className="text-lg leading-tight text-secondary-foreground">{userData.username}</span>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Edit your profile settings
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem to="/Notifications" title="Notifications">
                                See your notifications in the system.
                            </ListItem>
                            <ListItem to="/settings/editor/2" title="Editor Settings">
                                View editor settings and customize as desired.
                            </ListItem>
                            <ListItem onClick={handleLogouUser} title="Logout">
                                Log out of the application.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
