import React from "react";
import { closeModal, openModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { Button } from "@/components/ui/button";
import { Search, Share2 } from "lucide-react";
import Modal from "@/pages/components/Modal";
import ShareProjectComp from "@/pages/settings/components/requestSettings/components/shareProject/ShareProjectComp";
import { useState } from "react";

const TitleProject = ({ singleRequest, filterText, setFilterText, setModalIsOpen, idProject }) => {
    const token = localStorage.getItem("token");
    const [loadingModal, setLoadingModal] = useState(false);
    const [dataShareProject, setDataShareProject] = useState({
        idProject: idProject,
        usernameOrEmail: "",
    });
    const [modalShareProject, setModalShareProject] = useState(false);
    return (
        <div className="titleProject">
            <nav className="nav-project">
                <h2>{singleRequest && singleRequest.projectName}</h2>
                <div className="align-nav-components">
                    <div className="lupaSearch-projects">
                        <div className="lupa"><Search width={20} /></div>
                        <input
                            className="bg-secondary"
                            title="Search"
                            placeholder="Search.."
                            type="search"
                            id="filter"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => openModal(setModalIsOpen)}>Upload</Button>
                        <Button variant="outline" size="icon" onClick={() => setModalShareProject(true)}>
                            <Share2 width={18} />
                        </Button>
                    </div>
                </div>
            </nav>
            <hr className="hr-project-title" />
            <Modal isOpen={modalShareProject} onClose={() => closeModal(setModalShareProject)}>
                <ShareProjectComp
                    dataShareProject={dataShareProject}
                    setDataShareProject={setDataShareProject}
                    close={() => closeModal(setModalShareProject)}
                    token={token}
                    loading={loadingModal}
                    setLoading={setLoadingModal}
                    idProject={idProject}
                />
            </Modal>
        </div>
    )
}
export default TitleProject;