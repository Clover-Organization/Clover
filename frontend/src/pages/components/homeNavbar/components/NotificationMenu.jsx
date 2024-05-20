import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { isEmpty } from "lodash";
import { LogOut, User } from "lucide-react";

const components = [
    {
        title: "Versioning",
        to: "/docs/versioning",
        description:
            "Understand how versioning works in our project.",
    },
    {
        title: "Annotation",
        to: "/docs/annotations",
        description:
            "See a little about our project notes.",
    },
    {
        title: "GitHub",
        to: "https://github.com/thepokenik/clover",
        target: "_blank",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
]

export function NotificationMenu({ userData, idProject, shareUsers, notifications }) {
    const navigate = useNavigate('/')
    const [isShareUser, setIsShareUser] = useState(false);

    useEffect(() => {
        if (shareUsers !== undefined && Array.isArray(shareUsers) && shareUsers.length > 0) {
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
                    <NavigationMenuTrigger>Menu {notifications.length > 0 && (<div className="absolute top-5 left-1 bg-primary rounded-full mb-2 w-5 h-5"> <span className="relative -top-0">{notifications.length >= 9 ? "9+" : notifications.length}</span> </div>)}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-4">
                                <NavigationMenuLink asChild>
                                    <div className="flex h-full w-full select-none flex-col justify-between rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                        <Link
                                            className="hover:brightness-90"
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
                                                    <User className="w-24 h-24" />
                                                )}
                                            </div>
                                            <span className="text-lg leading-tight text-secondary-foreground">{userData.username}</span>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Edit your profile settings
                                            </p>
                                        </Link>
                                        <div className="flex justify-end">
                                            <LogOut className="cursor-pointer hover:text-foreground/80" onClick={handleLogouUser} width={20} />
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            </li>
                            <ListItem to="/notifications" title="Notifications" notifications={notifications.length}>
                                See your notifications in the system.
                            </ListItem>
                            {idProject != null && idProject != 'editor' && (
                                <ListItem to={isShareUser ? `` : `/settings/${idProject}/1`} title="Project Settings" className={isShareUser ? "cursor-no-drop " : "cursor-pointer " + "text-secondary-foreground"}>
                                    See your project information in more detail.
                                </ListItem>
                            )}
                            <ListItem to="/settings/editor/2" title="Editor Settings">
                                View editor settings and customize as desired.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[380px] md:grid-cols-2 lg:w-[400px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    to={component.to}
                                    target={component.target}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

const ListItem = React.forwardRef(
    ({ className, title, children, target, notifications, ...props }, ref) => {
        const location = useLocation().pathname;
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        target={target}
                        ref={ref}
                        className={cn(
                            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${location === props.to ? "bg-accent text-accent-foreground" : "text-secondary-foreground"}`,
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none flex items-center gap-2">{title}  {notifications > 0 && (<div className="bg-primary rounded-full w-5 h-5"> <span className={`relative top-0.5 ${notifications >= 9 ? "left-0.5" : "left-1.5"}`}>{notifications >= 9 ? "9+" : notifications}</span> </div>)}</div>
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
