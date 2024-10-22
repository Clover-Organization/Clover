import { Button } from "@/components/ui/button";
import { WelcomeNavbar } from "../welcomeNavbar/WelcomeNavbar";
import { MobileNav } from "../mobileNavbar/MobileNavbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRequestById } from "@/pages/home/components/utils/fetchRequestById/fetchRequestById";
import { FetchUser } from "@/pages/home/components/utils/getInfoUser/FetchUser";
import HomeNavbar from "@/pages/components/homeNavbar/HomeNavbar";
import ProfileMenu from "@/pages/components/homeNavbar/components/ProfileMenu";
import { NotificationMenu } from "@/pages/components/homeNavbar/components/NotificationMenu";
import { getAllNotificationsByUser } from "@/pages/notification/components/utils/getAllNotificationsByUser/getAllNotificationsByUser";
import Navbar from "@/pages/components/Navbar";
import NavbarSettings from "@/components/navbarSettings/NavbarSettings";


export default function WelcomeHeader({ idProject }) {
	const [role, setRole] = useState(localStorage.getItem("role"));
	const [userData, setUserData] = useState({});
	const [singleRequest, setSingleRequest] = useState({});
	const token = localStorage.getItem("token");
	const [notifications, setNotifications] = useState([]);
	

	if (role) {
		useEffect(() => {
			FetchUser(token, setUserData);
			fetchRequestById(token, idProject, setSingleRequest);
		}, [token]);
	}

	const handleAllNotifications = async () => {
		await getAllNotificationsByUser(token, setNotifications, 0, "", () => { });
	}

	useEffect(() => {
		handleAllNotifications();
	}, []);


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
								<NavbarSettings />
								{!role ? (
									<>

										<Button variant="ghost" asChild><Link to="/auth/login">Sign In</Link></Button>
										<Button asChild><Link to="/auth/register">Sign Up</Link></Button>
									</>
								) : (
									<div className="flex">
										<ProfileMenu userData={userData} idProject={idProject} shareUsers={singleRequest.shareUsers} />
										<NotificationMenu userData={userData} idProject={idProject} shareUsers={singleRequest.shareUsers} notifications={notifications} />
									</div>
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
