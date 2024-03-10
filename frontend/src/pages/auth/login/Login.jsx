import WelcomeHeader from "@/pages/welcomePage/components/welcomeHeader/WelcomeHeader";
import "../components/style.css";
import LoginScreen from "./components/LoginScreen";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<main className="authMain">
			<WelcomeHeader />
			<div className="flex justify-center items-center h-screen">
				<div className="p-4">
					<LoginScreen />
					<p className="mt-4 text-center text-gray-400">
						Don't have an account?
						<Link
							to={"/auth/register"}
							className="text-green-500 hover:text-green-600 text-center"
						>
							{" "}
							Register now!
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
};

export default Login;
