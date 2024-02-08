// RequestDetails.jsx

import React from 'react';
import UserPreview from '../userPreview/UserPreview';
import { openModalUpdate } from '../utils/ModalFunctions/ModalFunctions';

const RequestDetails =
    ({
        singleRequest,
        isExpanded,
        focusDescription,
        handleSomeAction,
        setEditedRequest,
        setModalUpdateIsOpen,
        editedRequest,
        role
    }) => {
        return (
            <div className="singleRequest">

                <div>
                    <span>Request ID:</span> {singleRequest.idProject}
                </div>

                <div>
                    <span>Name:</span> {singleRequest.projectName}
                </div>

                <div style={{ cursor: "pointer" }} onClick={focusDescription}>
                    <span>Description:</span> {isExpanded ? <div className="focusDesc">{singleRequest.projectDescription}</div> : <>[EXTEND]</>}
                </div>

                <div className="btnSave">
                    <button onClick={() => openModalUpdate(singleRequest.idProject, handleSomeAction, setEditedRequest, singleRequest, editedRequest, setModalUpdateIsOpen)}>Update!</button>
                </div>
            </div>
        );
    };

export default RequestDetails;