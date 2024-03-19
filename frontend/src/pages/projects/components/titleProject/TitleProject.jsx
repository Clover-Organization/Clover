import React from "react";
import lupa from '../../../home/assets/lupa.png';
import { openModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { Button } from "@/components/ui/button";

const TitleProject = ({ singleRequest, filterText, setFilterText, setModalIsOpen }) => {
    return (
        <div className="titleProject">
            <nav className="nav-project">
                <h2>{singleRequest && singleRequest.projectName}</h2>
                <div className="align-nav-components">
                    <div className="lupaSearch-projects">
                        <div className="lupa"><img src={lupa} alt="Search" /></div>
                        <input
                            title="Search"
                            placeholder="Search.."
                            type="search"
                            id="filter"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" onClick={() => openModal(setModalIsOpen)}>Upload</Button>
                </div>
            </nav>
            <hr className="hr-project-title" />
        </div>
    )
}
export default TitleProject;