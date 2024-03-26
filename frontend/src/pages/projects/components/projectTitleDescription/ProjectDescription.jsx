import React from "react";
import commitIcon from '../../assets/commitIcon.png'

const ProjectDescription = ({ singleRequest, commitsRequest }) => {
    return (
        <div className="description-project text-secondary-foreground">
            <h3>About</h3>
            <div>
                <span className="text-secondary-foreground">{singleRequest && singleRequest.projectDescription}</span>
            </div>
            <div className="creationProject">
                <h4>Creation Project</h4>
                <span className="text-secondary-foreground">{singleRequest && singleRequest.creationDate}</span>
            </div>
            <div className="commitsProject">
                <h4 className="text-secondary-foreground">Commits</h4>
                <div className="countCommits">
                    <img src={commitIcon} alt="Commits Icon" />
                    <span>{commitsRequest && commitsRequest.length}</span>
                </div>
            </div>
        </div>
    )
}
export default ProjectDescription;