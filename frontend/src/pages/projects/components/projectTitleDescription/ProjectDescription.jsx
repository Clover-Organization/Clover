import React from "react";
import commitIcon from '../../assets/commitIcon.png'

const ProjectDescription = ({ singleRequest, commitsRequest }) => {
    return (
        <div className="description-project">
            <h3>About</h3>
            <div>
                <span>{singleRequest && singleRequest.projectDescription}</span>
            </div>
            <div className="creationProject">
                <h4>Creation Project</h4>
                <span>{singleRequest && singleRequest.creationDate}</span>
            </div>
            <div className="commitsProject">
                <h4>Commits</h4>
                <div className="countCommits">
                    <img src={commitIcon} alt="Commits Icon" />
                    <span>{commitsRequest && commitsRequest.length}</span>
                </div>
            </div>
        </div>
    )
}
export default ProjectDescription;