// DeleteRequestConfirmation.jsx
import React from 'react';
import UserPreview from '../userPreview/UserPreview';

const DeleteRequestConfirmation = ({ singleRequest, handleDeleteAction, editedRequest, role }) => {
    return (
        <div className="userPreview">
            <div className="password-update-modal">
                <h5>Deseja deletar o projeto com o ID:</h5>
                <p>{singleRequest.idProject}</p>
            </div>

            <div className="btnSave">
                <button className="deleteBtn" onClick={() => handleDeleteAction(editedRequest)}>Delete!</button>
            </div>
        </div>
    );
};

export default DeleteRequestConfirmation;
