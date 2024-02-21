import { useState } from "react";
import "../components/style.css";
import img from "../assets/imgFront.png";
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
import { handleInputBlur, handleInputFocus } from "../../home/components/utils/handleInput/HandleInput";
import { tokenMailForgotPassword } from "./components/utils/tokenMailForgotPassword";
import { tokenCheckAndUpdatePassword } from "../../home/components/utils/tokenCheckUpdate/TokenCheckAndUpdatePassword";

const Login = ({ toggleForm }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateScreen, setShowUpdateScreen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalLabelAndPassword, setModalLabelAndPassword] = useState(false);
  const [tokenMailLabel, setTokenMailLabel] = useState({
    token: "",
    newPassword: ""
  });

  const [errors, setErrors] = useState([]);

  const [modal, setModal] = useState({ display: 'none' });
  const [modalOpacity, setModalOpacity] = useState({ display: 'none' });


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await cadastrar();
    limpar();
  };

  const closeModalOpacity = () => {
    setModalOpacity({ display: "none" });
    setModal({ display: "none" });
  };

  const limpar = () => {
    setUsername("");
    setPassword("");
  };

  const cadastrar = async () => {
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseJson = await response.json();
        const token = responseJson.token;
        localStorage.setItem("token", token);
        navigate("/");
      } else if (response.status === 401) {
        const error = await response.json(Error);
        setErrors([error]);
        setModalOpacity({ display: "block" });
        setModal({ display: "block" });
      } else {
        console.log("Ocorreu um erro inesperado: " + response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar a solicitação:", error);
    }
  };

  const handleTokenCheckAndUpdatePassword = async (tokenMailLabel) => {
    await tokenCheckAndUpdatePassword(tokenMailLabel, setModalLabelAndPassword, setUpdateModal);
    setModalIsOpen(false);
    setShowUpdateScreen(false);
    setUpdateModal(false);
    setModalLabelAndPassword(false);
  }

  const sendToken = async (username) => {
    setLoading(true);
    await tokenMailForgotPassword(username)
    setLoading(false);
    setShowUpdateScreen(false);
    setUpdateModal(true);

  }

  return (
    <section className="sectionRegister">
      <article className="authArticle">
        <fieldset className="authFieldsetLogin">
          <img src={img} alt="authentication" />
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
            <div className="btn">
              <button className="ui-btn">
                <span>Login</span>
              </button>
              <a onClick={toggleForm}>
                <span>Don't have registration? register now!</span>
              </a>
              <a onClick={() => setModalIsOpen(true)}>
                <span>Forgot password</span>
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
              {errors.map((erro, index) => (
                <div key={index}>
                  <strong>{erro.Error}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Modal de fundo */}
        <div
          className="modalOpacity"
          onClick={closeModalOpacity}
          style={{ display: modalOpacity.display }}
        ></div>
      </article>
      <div className="WelcomeDescWave">
        <img src={wave} alt="" />
      </div>


      <Modal isOpen={modalIsOpen} onClose={() => {
        closeModal(setModalIsOpen)
        setShowUpdateScreen(true)
        setUpdateModal(false)
        setModalLabelAndPassword(false)
      }}>
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}
        {showUpdateScreen && (

          <div className="password-update-modal">
            <h5>Update Password</h5>
            <p>Enter the username where you want<br /> to receive the token</p>

            <InputField
              id="usernameEdit"
              label="Username"
              value={usernameEdit}
              onChange={(e) => setUsernameEdit(() => (e.target.value))}
              onMouseEnter={() => handleInputFocus('usernameEditLabel')}
              onMouseLeave={() => handleInputBlur('usernameEditLabel')}
            />

            <div className="btnSave">
              <button onClick={() => sendToken({ usernameEdit })}>Send!</button>
            </div>
          </div>
        )}
        {updateModal && (
          <PasswordUpdateModal
            label="Enter token to update password"
            value={tokenMailLabel.token}
            onChange={(e) => setTokenMailLabel((prev) => ({ ...prev, token: e.target.value }))}
            onClick={() => { setUpdateModal(false), setModalLabelAndPassword(true) }}
          />
        )}

        {modalLabelAndPassword && (
          <PasswordUpdateWithNewPasswordModal
            label="Enter your new password"
            value={tokenMailLabel.newPassword}
            onChange={(e) => setTokenMailLabel((prev) => ({ ...prev, newPassword: e.target.value }))}
            onClick={() => handleTokenCheckAndUpdatePassword(tokenMailLabel)}
          />
        )}
      </Modal>
    </section>
  );
};

export default Login;
