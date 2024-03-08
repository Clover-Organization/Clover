import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { WelcomeNavbar } from "../welcomeNavbar/WelcomeNavbar";
import { MobileNav } from "../mobileNavbar/MobileNavbar";
import { Link } from "react-router-dom";

export default function WelcomeHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<WelcomeNavbar />
                <MobileNav />
				<div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
					<nav className="flex items-center">
						<div className="flex items-center justify-end md:justify-end">
							<div className="flex items-center justify-center gap-2 md:justify-end">
								<ModeToggle />
                                <Button asChild><Link to="/Auth">Sign In</Link></Button>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
