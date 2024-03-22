import { useEffect, useState } from 'react';
import { updateRequest } from '../../../home/components/utils/updateRequest/UpdateRequest';
import { closeModal, closeModalDelete, closeModalUpdate, openModalConfirm, openModalDelete, openModalUpdate } from '../../../home/components/utils/ModalFunctions/ModalFunctions';
import { fetchRequestById } from '../../../home/components/utils/fetchRequestById/fetchRequestById';
import { deleteRequest } from '../../../home/components/utils/deleteRequest/DeleteRequest';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import UpdateRequest from '../../../home/components/updateRequest/UpdateRequest';
import Modal from '../../../components/Modal';
import DeleteRequestConfirmation from '../../../home/components/deleteRequestConfirmation/deleteRequestConfirmation';
import ShareProjectComp from './components/shareProject/ShareProjectComp';
import UserDetailsSettingsMenu from './components/userDetailsSettingsMenu/UserDetailsSettingsMenu';

export const RequestSettings = ({ idProject }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const [loading, setLoading] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalShareProject, setModalShareProject] = useState(false);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [singleRequest, setSingleRequest] = useState({});
    const [editedRequest, setEditedRequest] = useState({
        projectName: "",
        projectDescription: "",
    });

    const [dataShareProject, setDataShareProject] = useState({
        idProject: idProject,
        usernameOrEmail: "",
    });

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
        setModalConfirmIsOpen(false);
    }

    const handleDeleteAction = async () => {
        await deleteRequest(token, editedRequest);
        setModalConfirmIsOpen(false);
        setModalUpdateIsOpen(false);
        setModalDeleteIsOpen(false);
        navigate('/');
    };

    return (
        <article className='article-settings-content'>
            <div className='my-6'>
                <CardTitle>Project Configurations</CardTitle>
                <CardDescription>Settings relating to your project</CardDescription>
            </div>

            <div className='flex items-center w-9/12 justify-between flex-wrap'>
                <div className='grid'>
                    <div className="excel-file-generator">
                        <h3>Share project</h3>
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


            <Modal isOpen={modalDeleteIsOpen} onClose={() => closeModalDelete(setModalDeleteIsOpen)}>

                <DeleteRequestConfirmation
                    singleRequest={singleRequest}
                    handleDeleteAction={handleDeleteAction}
                    editedRequest={editedRequest}
                    role={role}
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
