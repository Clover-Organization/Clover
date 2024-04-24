import * as React from "react"
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import logo from '../../../components/assets/PTCC.png'

export function MobileNav({ role, idProject, singleRequest }) {
    const [open, setOpen] = React.useState(false)
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <svg
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                    >
                        <path
                            d="M3 5H11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 19H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <MobileLink
                    to="/"
                    className="flex items-center gap-1"
                    onOpenChange={setOpen}
                >
                    <img src={logo} alt="logo" width={35} />
                    <span className="font-bold">Clover</span>
                </MobileLink>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        {!role ? (
                            <>
                                <MobileLink
                                    to="/docs"
                                    className={cn(
                                        "transition-colors hover:text-foreground/80",
                                        pathname === "/docs" ? "text-foreground" : "text-foreground/60"
                                    )}
                                >
                                    Docs
                                </MobileLink>
                                <MobileLink
                                    to="https://github.com/thepokenik/clover"
                                    className={cn(
                                        "text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
                                    )}
                                >
                                    GitHub
                                </MobileLink>
                            </>
                        ) : (
                            <>
                                {idProject !== null && idProject !== undefined ? (
                                    <MobileLink
                                        to={`/project/${idProject}`}
                                        className={cn(
                                            "transition-colors hover:text-foreground/80",
                                            pathname === `/project/${idProject}` ? "text-foreground" : "text-foreground/60"
                                        )}
                                    >
                                        {singleRequest.projectName}
                                    </MobileLink>
                                ) : (
                                    <MobileLink
                                        to={"/"}
                                        className={cn(
                                            "transition-colors hover:text-foreground/80",
                                            pathname === "/" ? "text-foreground" : "text-foreground/60"
                                        )}
                                    >
                                        Overview
                                    </MobileLink>
                                )}
                                {idProject !== null && idProject !== undefined && (
                                    <MobileLink
                                        to={`/annotation/${idProject}`}
                                        className={cn(
                                            "transition-colors hover:text-foreground/80",
                                            pathname?.startsWith("/about")
                                                ? "text-foreground"
                                                : "text-foreground/60"
                                        )}
                                    >
                                        Annotations
                                    </MobileLink>
                                )}
                                <MobileLink
                                    to={`/roadmap`}
                                    className={cn(
                                        "transition-colors hover:text-foreground/80",
                                        pathname === "/roadmap" ? "text-foreground" : "text-foreground/60"
                                    )}
                                >
                                    Roadmaps
                                </MobileLink>
                            </>
                        )}
                    </div>
                </ScrollArea >

            </SheetContent>
        </Sheet>
    )
}

function MobileLink({
    to,
    onOpenChange,
    className,
    children,
    ...props
}) {
    return (
        <Link
            to={to}
            onClick={() => {
                onOpenChange?.(false)
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    )
}