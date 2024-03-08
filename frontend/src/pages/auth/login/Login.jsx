import "../components/style.css";
import LoginScreen from "./components/LoginScreen";
import { Link } from "react-router-dom";

const Login = ({ toggleForm }) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="p-4">
				<LoginScreen />
				<p className="mt-4 text-center text-gray-400">
					Don't have an account?
					<Link
						onClick={toggleForm}
						className="text-green-500 hover:text-green-600 text-center"
					>
						{" "}
						Register now!
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
