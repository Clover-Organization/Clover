import React, { useEffect, useState } from "react";
import "../../App.css";

import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { fetchRequestById } from "../home/components/utils/fetchRequestById/fetchRequestById";
import ProjectDescription from "./components/projectTitleDescription/ProjectDescription";
import TitleProject from "./components/titleProject/TitleProject";
import FileContent from "./components/file-content/fileContent";
import Modal from "../components/Modal";
import { closeModal } from "../home/components/utils/ModalFunctions/ModalFunctions";
import DropFileZone from "./components/drop-files/DropFilesZone";
import { getCommitsByProject } from "./components/utils/getCommitsByProject/GetCommitsByProject";
import FolderContent from "./components/folder-content/FolderContent";
import GetLanguageInfos from "./components/utils/getLanguageInfo/GetLanguageInfos";

const Project = () => {
  const token = localStorage.getItem("token");
  const { idProject } = useParams();
  const [singleRequest, setSingleRequest] = useState({});
  const [commitsRequest, setCommitsRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProject = async () => {
    setLoading(true);
    await fetchRequestById(token, idProject, setSingleRequest);
    setLoading(false);
  };

  const getCommits = async () => {
    await getCommitsByProject(token, idProject, setCommitsRequest);
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchProject();
    getCommits();
  }, []);

  // Fetch requests periodically (every 5 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProject();
      getCommits();
    }, 10000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <main className="main-project-content">
      <Navbar idProject={idProject} />
      <article className="article-project-content">
        <section className="section-project-description">
          <div className="projectFiles">
            <>
              <TitleProject
                singleRequest={singleRequest}
                filterText={searchTerm}
                setFilterText={setSearchTerm}
                setModalIsOpen={setModalIsOpen}
              />
              {loading ? (
                <div className="align-loading">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div className="projects-files-content">
                  {Array.isArray(singleRequest.files) &&
                    singleRequest.files.length > 0 &&
                    singleRequest.files
                      .filter(
                        (file) =>
                          file &&
                          file.fileName &&
                          file.fileName.includes(searchTerm)
                      )
                      .map((file, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Link
                              to={`/project/file/${idProject}/${file.idFile}`}
                            >
                              <div className="file-content">
                                <FileContent item={file} imgIcon={GetLanguageInfos(file.fileName).imgUrl} token={token} />
                              </div>
                            </Link>
                            <hr className="hr-project-title" />
                          </React.Fragment>
                        );
                      })}

                  {Array.isArray(singleRequest.folder) &&
                    singleRequest.folder.length > 0 &&
                    singleRequest.folder
                      .filter(
                        (folder) =>
                          folder &&
                          folder.folderName &&
                          folder.folderName.includes(searchTerm)
                      )
                      .map((folder, index) => (
                        <React.Fragment key={index}>
                          <Link
                            to={`/project/folder/${idProject}/${folder.idFolder}`}
                          >
                            <div className="file-content">
                              <FolderContent item={folder} token={token} />
                            </div>
                          </Link>
                          <hr className="hr-project-title" />
                        </React.Fragment>
                      ))}
                </div>
              )}
            </>
          </div>
          <ProjectDescription
            singleRequest={singleRequest}
            commitsRequest={commitsRequest}
          />
        </section>
      </article>
      <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
        <DropFileZone idProject={idProject} token={token} />
      </Modal>
    </main>
  );
};

export default Project;
