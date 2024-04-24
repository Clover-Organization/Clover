import { useEffect, useState } from 'react';
import { updateRequest } from '../../../home/components/utils/updateRequest/UpdateRequest';
import { closeModal, closeModalDelete, closeModalUpdate } from '../../../home/components/utils/ModalFunctions/ModalFunctions';
import { fetchRequestById } from '../../../home/components/utils/fetchRequestById/fetchRequestById';
import { deleteRequest } from '../../../home/components/utils/deleteRequest/DeleteRequest';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UpdateRequest from '../../../home/components/updateRequest/UpdateRequest';
import Modal from '../../../components/Modal';
import ShareProjectComp from './components/shareProject/ShareProjectComp';
import UserDetailsSettingsMenu from './components/userDetailsSettingsMenu/UserDetailsSettingsMenu';
import { Separator } from '@radix-ui/react-separator';
import { FetchUser } from '@/pages/home/components/utils/getInfoUser/FetchUser';

export const RequestSettings = ({ idProject }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalShareProject, setModalShareProject] = useState(false);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [singleRequest, setSingleRequest] = useState({});
    const [editedRequest, setEditedRequest] = useState({
        idProject: idProject,
        projectName: "",
        projectDescription: "",
    });

    const [dataShareProject, setDataShareProject] = useState({
        idProject: idProject,
        usernameOrEmail: "",
    });

    if (role) {
        useEffect(() => {
            FetchUser(token, setUserData);
        }, [token]);
    }

    // Fetch requests when the component mounts and requests are not loaded
    useEffect(() => {
        if (!requestsLoaded) {
            fetchProject();
        }
    }, [requestsLoaded]);

    // Function to toggle the expansion of the description field
    const focusDescription = () => {
        setExpanded(!isExpanded);
    };

    const fetchProject = async () => {
        // setLoading(true);
        await fetchRequestById(token, idProject, setSingleRequest);
        setLoading(false);
    }

    const handleUpdateAction = async () => {
        await updateRequest(token, editedRequest, setSingleRequest);
        setModalUpdateIsOpen(false);
    }

    const handleDeleteAction = async () => {
        await deleteRequest(token, editedRequest);
        setModalUpdateIsOpen(false);
        navigate('/');
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (singleRequest.shareUsers !== undefined && Array.isArray(singleRequest.shareUsers) && singleRequest.shareUsers.length > 0) {
                // Verifica se o usuário compartilhou
                const hasShared = singleRequest.shareUsers.some(element => element.idUsers === userData.idUsers);
                if (hasShared) {
                    navigate("/");
                }
                console.log(hasShared);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [singleRequest.shareUsers, userData.idUsers, navigate]);

    return (
        <article className='article-settings-content'>
            <div className='my-4'>
                <CardTitle>Project Configurations</CardTitle>
                <CardDescription>Settings relating to your project</CardDescription>
            </div>

            <div className='flex items-center w-9/12 justify-between flex-wrap'>
                <div className='grid'>
                    <div className="excel-file-generator">
                        <CardTitle>Share project</CardTitle>
                        <span className="font-bold sm:inline-block text-secondary-foreground">You can share your project with your friends!</span>
                        <div>
                            <Button variant="outline" onClick={() => setModalShareProject(true)}>
                                Share
                            </Button>
                        </div>
                    </div>

                    <UserDetailsSettingsMenu
                        singleRequest={singleRequest}
                        fetchProject={fetchProject}
                        setEditedRequest={setEditedRequest}
                        editedRequest={editedRequest}
                        setModalUpdateIsOpen={setModalUpdateIsOpen}
                        handleDeleteAction={handleDeleteAction}
                    />
                </div>
            </div>

            <Modal isOpen={modalShareProject} onClose={() => closeModal(setModalShareProject)}>
                <ShareProjectComp
                    dataShareProject={dataShareProject}
                    setDataShareProject={setDataShareProject}
                    close={() => closeModal(setModalShareProject)}
                    token={token}
                    loading={loading}
                    setLoading={setLoading}
                    idProject={idProject}
                />
            </Modal>

            <Modal isOpen={modalUpdateIsOpen} onClose={() => { closeModalUpdate(setModalUpdateIsOpen) }}>

                <UpdateRequest
                    editedRequest={editedRequest}
                    singleRequest={singleRequest}
                    setEditedRequest={setEditedRequest}
                    handleUpdateAction={handleUpdateAction}
                    onClose={() => closeModal(setModalUpdateIsOpen)}
                />
            </Modal>

        </article>
    );
};
