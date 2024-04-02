import React from "react";
import { openModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { Button } from "@/components/ui/button";
import { Search, Share2 } from "lucide-react";

const TitleProject = ({ singleRequest, filterText, setFilterText, setModalIsOpen, setModalShareProject }) => {
    return (
        <div className="titleProject">
            <nav className="nav-project">
                <h2>{singleRequest && singleRequest.projectName}</h2>
                <div className="align-nav-components">
                    <div className="lupaSearch-projects">
                        <div className="lupa"><Search width={20}/></div>
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
        </div>
    )
}
export default TitleProject;