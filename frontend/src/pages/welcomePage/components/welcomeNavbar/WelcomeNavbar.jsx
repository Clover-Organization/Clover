import * as React from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Icon from "@/pages/components/Icon";
import logo from "@/pages/components/assets/PTCC.png";

export function WelcomeNavbar() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<div className="mr-4 hidden md:flex">
			<Link to="/" className="mr-6 flex items-center space-x-2">
				<Icon src={logo} alt="logo"/>
				<span className="hidden font-bold sm:inline-block text-white">
					Clover
				</span>
			</Link>
			<nav className="flex items-center gap-6 text-sm">
				<Link
					to="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/docs" ? "text-foreground" : "text-foreground/60"
					)}
				>
					Docs
				</Link>
				<Link
					to="/docs/components"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/components")
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					Components
				</Link>
				<Link
					to="/themes"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/themes")
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					Themes
				</Link>
				<Link
					to="/examples"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/examples")
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					Examples
				</Link>
				<Link
					to="/"
					className={cn(
						"hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
					)}
				>
					GitHub
				</Link>
			</nav>
		</div>
	);
}
