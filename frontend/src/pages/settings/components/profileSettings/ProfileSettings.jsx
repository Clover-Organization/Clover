import { useState, useEffect, useRef } from "react";
import { FetchUser } from "../../../home/components/utils/getInfoUser/FetchUser";
import { closeModalUserUpdate, openModalUserUpdate } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { handleInputBlur, handleInputFocus } from "../../../home/components/utils/handleInput/HandleInput";
import { PasswordUpdateWithNewPasswordModal } from "./components/PasswordUpdateWithNewPasswordModal ";
import { updateUser } from '../../../home/components/utils/updateUser/UpdateUser'
import { PasswordUpdateModal } from "./components/PasswordUpdateModal ";
import { tokenMail } from "../../../home/components/utils/getTokenFromEmail/tokenMail";
import { tokenCheckAndUpdatePassword } from "../../../home/components/utils/tokenCheckUpdate/TokenCheckAndUpdatePassword";
import { FileChange } from "../../../home/components/utils/updateImageUser/FileChange";
import InputField from "../../../home/components/inputField/InputField";
import Modal from '../../../components/Modal';

import user from '../../assets/user.png';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const ProfileSettings = () => {

    const navigate = useNavigate('/')

    const token = localStorage.getItem('token');
    const [showUpdateScreen, setShowUpdateScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [modalLabelAndPassword, setModalLabelAndPassword] = useState(false);
    const [tokenMailLabel, setTokenMailLabel] = useState({
        token: "",
        newPassword: ""
    });
    const [userData, setUserData] = useState({});
    const [editUser, setEditUser] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImageIsOpen, setModalImageIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        FetchUser(token, setUserData);
    }, [token]);

    const handleUpdateUserAction = async () => {
        await updateUser(editUser, token, setUserData)
        closeModalUserUpdate(setModalIsOpen);
    }

    const sendToken = async (email) => {
        setLoading(true);
        await tokenMail(email, token)
        setLoading(false);
        setShowUpdateScreen(false);
        setUpdateModal(true);

    }

    const handleTokenCheckAndUpdatePassword = async (tokenMailLabel) => {
        await tokenCheckAndUpdatePassword(tokenMailLabel, token, setModalLabelAndPassword, setUpdateModal);
        closeModalUserUpdate(setModalIsOpen);
        setShowUpdateScreen(false);
        setUpdateModal(false);
        setModalLabelAndPassword(false);
    }

    const handleUpdateImage = async () => {
        const fakeEvent = {
            target: {
                files: [selectedFile],
            },
        };
        await FileChange(fakeEvent, token);
        setModalImageIsOpen(false)
        FetchUser(token, setUserData)
    }

    const handleImageClick = () => {
        if (!isEditing) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsEditing(false);
        }
    };

    const openModalUpdateImage = () => {
        setModalImageIsOpen(true);
    }

    const closeModalUpdateImage = () => {
        setModalImageIsOpen(false);
    }

    const handleLogouUser = () => {
        Swal.fire({
            text: `Logout! `,
            icon: 'success',
            customClass: {
                popup: 'custom-popup-class',
            },
        });
        localStorage.removeItem('token');
        navigate('/welcome');
    }


    return (
        <article className='article-settings-content'>
            <div className="div-user-content">
                <h1>Profile</h1>
                <div className="user-info-image-content">
                    <div className="information-user-content">
                        <div className="idProfileSettings">
                            <span>Id</span>
                            <p>{userData.idUsers || 'NaN'}</p>
                        </div>
                        <div>
                            <span>Username</span>
                            <p>{userData.username || 'NaN'}</p>
                        </div>
                        <div>
                            <span>First name</span>
                            <p>{userData.firstName || 'NaN'}</p>
                        </div>
                        <div>
                            <span>Last name</span>
                            <p>{userData.lastName || 'NaN'}</p>
                        </div>
                        <div>
                            <span>Email</span>
                            <p>{userData.email || 'NaN'}</p>
                        </div>
                        <div>
                            <span>Birth</span>
                            <p>{userData.birth || 'NaN'}</p>
                        </div>
                        <div>
                            <span>Creation Account</span>
                            <p>{userData.creationAccount || 'NaN'}</p>
                        </div>
                        <div className="btnAlign-profile">
                            <div className="addBtn">
                                <button onClick={() => openModalUserUpdate(setModalIsOpen, setEditUser, userData)}>Update!</button>
                            </div>
                            <div className="addBtn">
                                <button onClick={() => handleLogouUser()}>Logout!</button>
                            </div>
                        </div>
                    </div>
                    <div className="userImage">
                        <h2>Profile picture</h2>
                        <div className="image" onClick={() => openModalUpdateImage()}>
                            <img src={userData.profileImage ? `data:image/png;base64,${userData.profileImage}` : user} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => {
                closeModalUserUpdate(setModalIsOpen),
                    setShowUpdateScreen(false),
                    setUpdateModal(false),
                    setModalLabelAndPassword(false)
            }}>
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
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
                {showUpdateScreen && (
                    <div className="password-update-modal">
                        <h5>Update Password</h5>
                        <p>Enter the email where you want<br /> to receive the token</p>

                        <InputField
                            id="email"
                            label="Email"
                            value={editUser.email}
                            onChange={(e) => setEditUser((prev) => ({ ...prev, email: e.target.value }))}
                            onMouseEnter={() => handleInputFocus('emailLabel')}
                            onMouseLeave={() => handleInputBlur('emailLabel')}
                        />

                        <div className="btnSave">
                            <button onClick={() => sendToken({ email: editUser.email })}>Send!</button>
                        </div>
                    </div>
                )}
                {!updateModal && !showUpdateScreen && !modalLabelAndPassword && (
                    <>

                        <InputField
                            id="firstName"
                            label="First name"
                            value={editUser.firstName}
                            onChange={(e) => setEditUser((prev) => ({ ...prev, firstName: e.target.value }))}
                            onMouseEnter={() => handleInputFocus('firstNameLabel')}
                            onMouseLeave={() => handleInputBlur('firstNameLabel')}
                        />

                        <InputField
                            id="lastName"
                            label="Last name"
                            value={editUser.lastName}
                            onChange={(e) => setEditUser((prev) => ({ ...prev, lastName: e.target.value }))}
                            onMouseEnter={() => handleInputFocus('lastNameLabel')}
                            onMouseLeave={() => handleInputBlur('lastNameLabel')}
                        />

                        <InputField
                            id="email"
                            label="Email"
                            value={editUser.email}
                            onChange={(e) => setEditUser((prev) => ({ ...prev, email: e.target.value }))}
                            onMouseEnter={() => handleInputFocus('emailLabel')}
                            onMouseLeave={() => handleInputBlur('emailLabel')}
                        />

                        <InputField
                            id="birth"
                            label="Birth"
                            value={editUser.birth}
                            onChange={(e) => setEditUser((prev) => ({ ...prev, birth: e.target.value }))}
                            onMouseEnter={() => handleInputFocus('birthLabel')}
                            onMouseLeave={() => handleInputBlur('birthLabel')}
                        />

                        <div className="btnAlign">
                            <div className="btnSave">
                                <button onClick={() => handleUpdateUserAction(editUser, token)}>Update!</button>
                            </div>
                            <div className="btnSave">
                                <button onClick={() => setShowUpdateScreen(true)}>More!</button>
                            </div>
                        </div>
                    </>
                )}
            </Modal>

            <Modal isOpen={modalImageIsOpen} onClose={closeModalUpdateImage}>
                <div className="password-update-modal">
                    <h5>Update image profile</h5>
                    <p>Select a new image profile.</p>

                    <div className="user-image-update">
                        <div className="image" onClick={handleImageClick}>
                            <img src={selectedFile ? URL.createObjectURL(selectedFile) : (userData.profileImage ? `data:image/png;base64,${userData.profileImage}` : user)} alt="userImage" />
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="btnSave">
                        <button onClick={() => handleUpdateImage()}>Update!</button>
                    </div>
                </div>
            </Modal>
        </article>
    )
}