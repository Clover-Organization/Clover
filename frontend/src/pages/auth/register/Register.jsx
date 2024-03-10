import { Link } from "react-router-dom";
import "../components/style.css";
import RegisterScreen from "./components/RegisterScreen";
import WelcomeHeader from "@/pages/welcomePage/components/welcomeHeader/WelcomeHeader";

const Register = () => {
	return (
		<main className={`authMain`}>
			<WelcomeHeader />
			<div className="flex justify-center items-center h-screen">
				<div className="p-4">
					<RegisterScreen />
					<p className="mt-4 text-center text-gray-400">
						Already registered?
						<Link to={"/auth/login"} className="text-green-500 hover:text-green-600 text-center mt-4"> Log in!</Link>
					</p>
				</div>
			</div>
		</main>
	);
};

export default Register;