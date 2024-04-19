import React from "react";
import { closeModal, openModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { Button } from "@/components/ui/button";
import { Plus, Search, Share2, Upload } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/pages/components/Modal";
import ShareProjectComp from "@/pages/settings/components/requestSettings/components/shareProject/ShareProjectComp";
import CreateFile from "./components/createFile/CreateFile";

const TitleProject = ({ singleRequest, filterText, setFilterText, setModalIsOpen, idProject, idFolder }) => {
    const token = localStorage.getItem("token");
    const [loadingModal, setLoadingModal] = useState(false);
    const [dataShareProject, setDataShareProject] = useState({
        idProject: idProject,
        usernameOrEmail: "",
    });
    const [modalShareProject, setModalShareProject] = useState(false);
    const [modalCreateFile, setModalCreateFile] = useState(false);
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

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Add file</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-36">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => openModal(setModalCreateFile)} className="flex gap-2">
                                        <Plus width={18} />
                                        Create new file
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openModal(setModalIsOpen)} className="flex gap-2">
                                        <Upload width={18} />
                                        Upload file
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

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

            <Modal isOpen={modalCreateFile} onClose={() => closeModal(setModalCreateFile)}>
                <CreateFile
                    close={() => closeModal(setModalCreateFile)}
                    idProject={idProject}
                    idFolder={idFolder}
                />
            </Modal>
        </div>
    )
}
export default TitleProject;