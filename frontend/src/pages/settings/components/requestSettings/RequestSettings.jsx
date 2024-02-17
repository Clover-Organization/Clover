import { useEffect, useState } from 'react';
import UpdateRequest from '../../../home/components/updateRequest/UpdateRequest';
import Modal from '../../../components/Modal';
import { updateRequest } from '../../../home/components/utils/updateRequest/UpdateRequest';
import DeleteRequestConfirmation from '../../../home/components/deleteRequestConfirmation/deleteRequestConfirmation';
import { closeModalConfirm, closeModalDelete, closeModalUpdate, openModalConfirm } from '../../../home/components/utils/ModalFunctions/ModalFunctions';
import { fetchRequestById } from '../../../home/components/utils/fetchRequestById/fetchRequestById';
import RequestDetails from '../../../home/components/requestDetails/RequestDetails';
import { deleteRequest } from '../../../home/components/utils/deleteRequest/DeleteRequest';
import { useNavigate } from 'react-router-dom';

export const RequestSettings = ({ idProject }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const [loading, setLoading] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [singleRequest, setSingleRequest] = useState({});
    const [editedRequest, setEditedRequest] = useState({
        projectName: "",
        projectDescription: "",
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
                <span>Here you can change the name and description of your project.</span>

                <div className='addBtn' onClick={() => openModalConfirm(idProject, fetchProject, setModalConfirmIsOpen)}>
                    <button>Update</button>
                </div>

            </div>

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
