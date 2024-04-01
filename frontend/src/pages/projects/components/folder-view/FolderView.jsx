import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import TitleProject from "../titleProject/TitleProject";
import FileContent from "../file-content/fileContent";
import { getFilesByFolders } from "../utils/getFilesByFolders/getFilesByFolders";
import { fetchRequestById } from "../../../home/components/utils/fetchRequestById/fetchRequestById";
import Modal from "../../../components/Modal";
import { closeModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import DropZoneFolderView from "./components/DropZoneFolderView/DropZoneFolderView";
import FolderContent from "../folder-content/FolderContent";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";

const FolderView = () => {
    const token = localStorage.getItem('token');
    const { idProject, idFolder } = useParams();
    const navigate = useNavigate();

    const [singleRequest, setSingleRequest] = useState({});
    const [filesRequest, setFilesRequest] = useState({});
    const [commitsRequest, setCommitsRequest] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const getFolderAndFiles = async () => {
        setLoading(true);
        await fetchRequestById(token, idProject, setSingleRequest);
        await getFilesByFolders(token, idFolder, setFilesRequest);
        setLoading(false);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getFolderAndFiles();
            // console.log(singleRequest);
        }, 5000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [token]);

    useEffect(() => {
        getFolderAndFiles();
    }, [idFolder]);

    const handleFolderClick = (idFolder) => {
        // Mudar o link
        navigate(`/Project/Folder/${idProject}/${idFolder}`);
        // Recarregar a página (fazendo um fetch dos dados mais recentes)
        window.location.reload();
    };

    return (
        <main className="main-folder-view">
            <Navbar idProject={idProject} />
            <article className="article-project-content">
                <section className="section-project-description-folder-view">
                    <div className="projectFiles-sc-max-folder">
                        <>
                            <TitleProject singleRequest={singleRequest} filterText={searchTerm} setFilterText={setSearchTerm} setModalIsOpen={setModalIsOpen} />
                            {loading ? (
                                <div className="align-loading">
                                    <div className="spinner"></div>
                                </div>
                            ) : (

                                <div className="projects-files-content">
                                    {(Array.isArray(filesRequest.files) && filesRequest.files.length > 0) && (
                                        filesRequest.files
                                            .filter(file => file && file.fileName && file.fileName.includes(searchTerm))
                                            .map((file, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Link to={`/project/file/${idProject}/${file.idFile}/${idFolder}`}>
                                                            <div className="file-content">
                                                                <FileContent item={file} imgIcon={GetLanguageInfos(file.fileName).imgUrl} token={token} />
                                                            </div>
                                                        </Link>
                                                        <hr className="hr-project-title" />
                                                    </React.Fragment>)
                                            }))}

                                    {(Array.isArray(filesRequest.subFolders) && filesRequest.subFolders.length > 0) && (
                                        filesRequest.subFolders
                                            .filter(folder => folder && folder.folderName && folder.folderName.includes(searchTerm))
                                            .map((folder, index) => (
                                                <React.Fragment key={index}>
                                                    <Link to={`/project/folder/${idProject}/${folder.idFolder}`} onClick={() => handleFolderClick(folder.idFolder)}>
                                                        <div className="file-content">
                                                            <FolderContent item={folder} token={token} />
                                                        </div>
                                                    </Link>
                                                    <hr className="hr-project-title" />
                                                </React.Fragment>
                                            ))
                                    )}

                                </div>
                            )}
                        </>
                    </div>
                </section>
            </article>
            <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                <DropZoneFolderView token={token} idProject={idProject} idFolder={idFolder} onClose={() => closeModal(setModalIsOpen)} />
            </Modal>
        </main>
    );
};

export default FolderView;
