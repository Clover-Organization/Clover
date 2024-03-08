import { Link } from "react-router-dom";
import "../components/style.css";
import RegisterScreen from "./components/RegisterScreen";

const Register = ({ toggleForm }) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="p-4">
				<RegisterScreen />
				<p className="mt-4 text-center text-gray-400">
					Already registered? 
					<Link onClick={toggleForm} className="text-green-500 hover:text-green-600 text-center mt-4"> Log in!</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;