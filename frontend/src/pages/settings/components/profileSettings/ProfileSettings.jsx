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
import Modal from '../../../components/Modal';

import user from '../../assets/user.png';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UserDetails from "./components/userDetails/UserDetails";
import { Input } from "@/components/ui/input";

export const ProfileSettings = () => {

    const navigate = useNavigate('/')

    const token = localStorage.getItem('token');
    const [showUpdateScreen, setShowUpdateScreen] = useState(true);
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

    useEffect(() => {
        setEditUser({ ...userData });
    }, [userData]);


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
        toast.success("Sucess!", {
            description: "Logout Successfully!",
        });
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/welcome');
    }

    return (
        <article className='article-settings-content'>
            <UserDetails
                userData={userData}
                openModalUpdateImage={openModalUpdateImage}
                openModalUserUpdate={openModalUserUpdate}
                handleLogouUser={handleLogouUser}
                setEditUser={setEditUser}
                setModalIsOpen={setModalIsOpen}
                setUserData={setUserData}
                handleUpdateUserAction={handleUpdateUserAction}
                editUser={editUser}
            />
            <Modal isOpen={modalIsOpen} onClose={() => {
                closeModalUserUpdate(setModalIsOpen),
                    setShowUpdateScreen(true),
                    setUpdateModal(false),
                    setModalLabelAndPassword(false)
            }}>
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                )}

                <Card className="w-[350px] text-center">
                    <CardContent>
                        <div className="grid w-full items-center gap-2">
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
                                <>
                                    <CardHeader>
                                        <CardTitle>Update Password</CardTitle>
                                        <CardDescription>Enter the email where you want<br /> to receive the token</CardDescription>
                                    </CardHeader>
                                    <div className="grid gap-5">
                                        <Input
                                            id="email"
                                            label="Email"
                                            value={editUser.email}
                                            onChange={(e) => setEditUser((prev) => ({ ...prev, email: e.target.value }))}
                                            onMouseEnter={() => handleInputFocus('emailLabel')}
                                            onMouseLeave={() => handleInputBlur('emailLabel')}
                                        />
                                        <Button onClick={() => sendToken({ email: editUser.email })}>Send</Button>
                                    </div>
                                </>
                            )}
                            <Button variant="outline" onClick={() => { closeModalUserUpdate(setModalIsOpen), setModalLabelAndPassword(false), setUpdateModal(false), setShowUpdateScreen(true) }}>Cancel</Button>
                        </div>
                    </CardContent>
                </Card>
            </Modal>

            <Modal isOpen={modalImageIsOpen} onClose={closeModalUpdateImage}>
                <Card>

                    <CardHeader>
                        <CardTitle>Update image profile</CardTitle>
                        <CardDescription>Select a new image profile.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="user-image-update w-full">
                            <div className="flex flex-col space-y-1.5">
                                <div className="image " onClick={handleImageClick}>
                                    <img className="rounded-full h-60 object-cover" width={250} src={selectedFile ? URL.createObjectURL(selectedFile) : (userData.profileImage ? `data:image/png;base64,${userData.profileImage}` : user)} alt="userImage" />
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setModalImageIsOpen(false)}>Cancel</Button>
                        <Button onClick={() => handleUpdateImage()}>Save</Button>
                    </CardFooter>

                </Card>
            </Modal>
        </article >
    )
}