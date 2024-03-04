import { useState } from "react";
import "../components/style.css";
import imgError from "../assets/icons8-erro-48 (1).png";
import { useNavigate } from "react-router-dom";
import wave from "../assets/wave.svg";
import openEye from "../assets/openEye.png";
import closeEye from "../assets/closeEye.png";
import Modal from "../../components/Modal";
import InputField from "../../home/components/inputField/InputField";
import { PasswordUpdateWithNewPasswordModal } from "../../settings/components/profileSettings/components/PasswordUpdateWithNewPasswordModal ";
import { PasswordUpdateModal } from "../../settings/components/profileSettings/components/PasswordUpdateModal ";
import { closeModal } from "../../home/components/utils/ModalFunctions/ModalFunctions";
import {
	handleInputBlur,
	handleInputFocus,
} from "../../home/components/utils/handleInput/HandleInput";
import { tokenMailForgotPassword } from "./components/utils/tokenMailForgotPassword";
import { tokenCheckAndUpdatePassword } from "../../home/components/utils/tokenCheckUpdate/TokenCheckAndUpdatePassword";
import LoginScreen from "./components/LoginScreen";
import { ModeToggle } from "@/components/mode-toggle";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = ({ toggleForm }) => {
	return (
		<section className="sectionRegister">
			<article className="authArticle">
				<LoginScreen />
			</article>
		</section>
	);
};

export default Login;
