import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { WelcomeNavbar } from "../welcomeNavbar/WelcomeNavbar";
import { MobileNav } from "../mobileNavbar/MobileNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeNavbar from "@/pages/components/homeNavbar/HomeNavbar";
import { fetchRequestById } from "@/pages/home/components/utils/fetchRequestById/fetchRequestById";
import { FetchUser } from "@/pages/home/components/utils/getInfoUser/FetchUser";
import ProfileMenu from "@/pages/components/homeNavbar/components/ProfileMenu";

export default function WelcomeHeader({ idProject }) {
	const [role, setRole] = useState(localStorage.getItem("role"));
	const [userData, setUserData] = useState({});
	const [singleRequest, setSingleRequest] = useState({});
	const token = localStorage.getItem("token");

	if (role) {
		useEffect(() => {
			FetchUser(token, setUserData);
			fetchRequestById(token, idProject, setSingleRequest);
		}, [token]);

		useEffect(() => { }, [userData.profileImage]);
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/100">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				{role ? (
					<HomeNavbar idProject={idProject} />
				) : (
					<WelcomeNavbar />
				)}
				<MobileNav role={role} idProject={idProject} singleRequest={singleRequest} />
				<div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
					<nav className="flex items-center">
						<div className="flex items-center justify-end md:justify-end">
							<div className="flex items-center justify-center gap-2 md:justify-end">
								<ModeToggle />
								{!role ? (
									<>
										<Button variant="ghost" asChild><Link to="/auth/register">Sign Up</Link></Button>
										<Button asChild><Link to="/auth/login">Sign In</Link></Button>
									</>
								) : (
									<>
										<ProfileMenu userData={userData} />
									</>
								)
								}
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
