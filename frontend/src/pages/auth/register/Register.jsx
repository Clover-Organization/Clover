import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "../components/style.css";
import {
	handleInputFocus,
	handleInputBlur,
} from "../../home/components/utils/handleInput/HandleInput";

import imgError from "../assets/icons8-erro-48 (1).png";
import wave from "../assets/wave.svg";
import openEye from "../assets/openEye.png";
import closeEye from "../assets/closeEye.png";
import user from "../assets/user.png";
import RegisterScreen from "./components/RegisterScreen";

const Register = ({ toggleForm }) => {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [birth, setBirth] = useState("");
	const [role, setRole] = useState("USER");
	const [profileImage, setProfileImage] = useState(null);

	const [errors, setErrors] = useState([]);

	const [modal, setModal] = useState({ display: "none" });
	const [modalOpacity, setModalOpacity] = useState({ display: "none" });

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const inputRef = useRef(null);

	const handleImageClick = () => {
		inputRef.current.click();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateInputs()) {
			if (password === confirmPassword) {
				await cadastrar();
			} else {
				// Exibe um erro indicando que as senhas não coincidem
				setErrors([
					{
						campo: "Confirmação de senha",
						mensagem: "As senhas não coincidem.",
					},
				]);
				setModalOpacity({ display: "block" });
				setModal({ display: "block" });
			}
		} else {
			// Exibe um erro indicando que há campos obrigatórios vazios
			setErrors([
				{
					campo: "Campos obrigatórios",
					mensagem: "Preencha todos os campos obrigatórios.",
				},
			]);
			setModalOpacity({ display: "block" });
			setModal({ display: "block" });
		}
	};

	const validateInputs = () => {
		// Adicione verificações personalizadas para cada campo, se necessário
		if (
			!username.trim() ||
			!firstName.trim() ||
			!lastName.trim() ||
			!email.trim() ||
			!password.trim() ||
			!birth.trim()
		) {
			return false;
		}
		return true;
	};

	const getUserFile = async (userImagePath) => {
		const response = await fetch(userImagePath);
		const blob = await response.blob();

		// Extrai o nome do arquivo do caminho
		const fileName = userImagePath.split("/").pop();

		// Cria o objeto File
		const userFile = new File([blob], fileName, { type: blob.type });

		return userFile;
	};

	const cadastrar = async () => {
		const userData = {
			username: username,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			birth: birth,
			role: role,
		};

		const userFile = await getUserFile(user);
		console.log(userFile);

		const formData = new FormData();
		formData.append("profileImage", profileImage ? profileImage : userFile);

		formData.append(
			"userData",
			new Blob([JSON.stringify(userData)], { type: "application/json" })
		);

		try {
			const response = await fetch("http://localhost:8080/auth/register", {
				method: "POST",
				body: formData,
			});

			if (response.status === 201) {
				// Exibir alerta de sucesso
				Swal.fire({
					icon: "success",
					title: "Successful registration!",
				});
				limpar();
			} else if (response.status === 400) {
				const errorData = await response.json();
				const errorArray = [];

				// Mapeia os erros recebidos do backend para um formato mais legível
				for (const fieldName in errorData) {
					const errorMessage = errorData[fieldName];
					errorArray.push({ fieldName, errorMessage });
				}

				// Exibe o modal de erro
				setModalOpacity({ display: "block" });
				setErrors(errorArray);
				setModal({ display: "block" });

				// Exibir alerta de erro
				Swal.fire({
					icon: "error",
					title: "Erro",
					text: "Erro ao cadastrar usuário.",
				});
			} else {
				console.log("Ocorreu um erro inesperado: " + response.status);
			}
		} catch (error) {
			console.log("Erro ao enviar a solicitação:", error);

			// Exibir alerta de erro
			Swal.fire({
				icon: "error",
				title: "Erro",
				text: "Erro ao enviar a solicitação.",
			});
		}
	};

	const closeModalOpacity = () => {
		setModalOpacity({ display: "none" });
		setModal({ display: "none" });
	};

	const limpar = () => {
		setUsername("");
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setBirth("");
		setProfileImage(null);
	};

	const handleImagePreview = () => {
		if (profileImage) {
			return URL.createObjectURL(profileImage);
		}
		return null;
	};

	return (
		<section className="flex align-center">
			<article className="authArticle">
				<RegisterScreen />
				<a onClick={toggleForm}>
					<span>Already registered? log in!</span>
				</a>
			</article>
		</section>
	);
};

export default Register;

/* <article className="authArticle">
<fieldset className="authFieldset">
<div className="authFieldImage">
  <span>Select your profile image</span>
  <div className="imagePreview" onClick={handleImageClick}>
    <img src={handleImagePreview() || user} alt="userImage" />
  </div>
  <input
    ref={inputRef}
    id="profileImage"
    type="file"
    accept="image/*"
    onChange={(e) => setProfileImage(e.target.files[0])}
    style={{ display: "none" }}
  />
</div>
<form onSubmit={handleSubmit} className="authForm">
  <div className="authField auth">
    <label
      id="usernameLabel"
      className={username ? "active" : ""}
      htmlFor="username"
    >
      Username
    </label>
    <input
      id="username"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      onMouseEnter={() => handleInputFocus("usernameLabel")}
      onMouseLeave={() => handleInputBlur("usernameLabel")}
    />
  </div>
  <div className="authField auth">
    <label
      id="firstNameLabel"
      className={firstName ? "active" : ""}
      htmlFor="firstName"
    >
      First Name
    </label>
    <input
      id="firstName"
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      onMouseEnter={() => handleInputFocus("firstNameLabel")}
      onMouseLeave={() => handleInputBlur("firstNameLabel")}
    />
  </div>
  <div className="authField auth">
    <label
      id="lastNameLabel"
      className={lastName ? "active" : ""}
      htmlFor="lastName"
    >
      Last Name
    </label>
    <input
      id="lastName"
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      onMouseEnter={() => handleInputFocus("lastNameLabel")}
      onMouseLeave={() => handleInputBlur("lastNameLabel")}
    />
  </div>
  <div className="authField auth">
    <label
      id="emailLabel"
      className={email ? "active" : ""}
      htmlFor="email"
    >
      Email
    </label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onMouseEnter={() => handleInputFocus("emailLabel")}
      onMouseLeave={() => handleInputBlur("emailLabel")}
    />
  </div>
  <div className="authField auth">
    <label
      id="passwordLabel"
      className={password ? "active" : ""}
      htmlFor="password"
    >
      Password
    </label>
    <div className="togglePassword auth">
      <span onClick={handleTogglePassword}>
        {showPassword ? (
          <img src={openEye} alt="Open Eye" />
        ) : (
          <img src={closeEye} alt="Closed Eye" />
        )}
      </span>
    </div>
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onMouseEnter={() => handleInputFocus("passwordLabel")}
      onMouseLeave={() => handleInputBlur("passwordLabel")}
    />
  </div>
  <div className="authField auth">
    <label
      id="confirmPasswordLabel"
      className={confirmPassword ? "active" : ""}
      htmlFor="confirmPassword"
    >
      Confirm Password
    </label>
    <input
      id="confirmPassword"
      type={showPassword ? "text" : "password"}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      onMouseEnter={() => handleInputFocus("confirmPasswordLabel")}
      onMouseLeave={() => handleInputBlur("confirmPasswordLabel")}
    />
  </div>
  <div className="authField auth">
    <legend>Birthday</legend>
    <input
      type="date"
      value={birth}
      onChange={(e) => setBirth(e.target.value)}
    />
  </div>
  <div className="btn">
    <button class="ui-btn">
      <span>Register</span>
    </button>
    <a onClick={toggleForm}>
      <span>Already registered? log in!</span>
    </a>
  </div>
</form>
</fieldset>
<div className="modal" style={{ display: modal.display }}>
<div className="errorModal">
  <div className="errorIcon">
    <img src={imgError} alt="Error" />
    <h2>Erro!</h2>
  </div>
  <hr />
  <div className="errorMessages">
    {errors.map((error, index) => (
      <div key={index}>
        <strong>{error.campo}</strong> {error.mensagem}
      </div>
    ))}
  </div>
</div>
</div>
<div
className="modalOpacity"
onClick={closeModalOpacity}
style={{ display: modalOpacity.display }}
></div>
</article> */
