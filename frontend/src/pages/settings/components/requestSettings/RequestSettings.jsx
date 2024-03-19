import { useEffect, useState } from 'react';
import UpdateRequest from '../../../home/components/updateRequest/UpdateRequest';
import Modal from '../../../components/Modal';
import RequestDetails from '../../../home/components/requestDetails/RequestDetails';
import DeleteRequestConfirmation from '../../../home/components/deleteRequestConfirmation/deleteRequestConfirmation';
import { updateRequest } from '../../../home/components/utils/updateRequest/UpdateRequest';
import { closeModal, closeModalConfirm, closeModalDelete, closeModalUpdate, openModalConfirm } from '../../../home/components/utils/ModalFunctions/ModalFunctions';
import { fetchRequestById } from '../../../home/components/utils/fetchRequestById/fetchRequestById';
import { deleteRequest } from '../../../home/components/utils/deleteRequest/DeleteRequest';
import { useNavigate } from 'react-router-dom';
import ShareProjectComp from './components/shareProject/ShareProjectComp';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
            <h1>Project Configurations</h1>

            <div className="excel-file-generator">
                <h3>Update Project</h3>
                <span className='hidden font-bold sm:inline-block text-secondary-foreground'>Here you can change the name and description of your project.</span>

                <div>
                    <Button onClick={() => openModalConfirm(idProject, fetchProject, setModalConfirmIsOpen)}>
                        Update
                    </Button>
                </div>

            </div>
            <div className="excel-file-generator">
                <h3>Share project</h3>
                <span className="hidden font-bold sm:inline-block text-secondary-foreground">You can share your project with your friends!</span>

                <div>
                    <Button onClick={() => setModalShareProject(true)}>
                        To share
                    </Button>
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

            <Modal isOpen={modalConfirmIsOpen} onClose={() => closeModalConfirm(setModalConfirmIsOpen)}>
                <RequestDetails
                    singleRequest={singleRequest}
                    isExpanded={isExpanded}
                    focusDescription={focusDescription}
                    handleSomeAction={fetchProject}
                    setEditedRequest={setEditedRequest}
                    setModalUpdateIsOpen={setModalUpdateIsOpen}
                    editedRequest={editedRequest}
                    role={role}
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
                    handleSomeAction={fetchProject}
                    handleUpdateAction={handleUpdateAction}
                    setModalDeleteIsOpen={setModalDeleteIsOpen}
                />
            </Modal>

        </article>
    );
};
