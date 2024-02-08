//UpdateRequest.jsx

import InputField from "../inputField/InputField";
import { openModalDelete } from "../utils/ModalFunctions/ModalFunctions";
import { handleInputBlur, handleInputFocus } from "../utils/handleInput/HandleInput";

const UpdateRequest =
    ({
        editedRequest,
        singleRequest,
        setEditedRequest,
        handleSomeAction,
        handleUpdateAction,
        setModalDeleteIsOpen,
    }) => (
        <div className="toolConfig">
            <div className="singleRequest">
                <span>ID:</span> {singleRequest.idProject}
            </div>

            <InputField
                id="projectName"
                label="Updated project name"
                value={editedRequest.projectName}
                onChange={(e) => setEditedRequest((prev) => ({ ...prev, projectName: e.target.value }))}
                onMouseEnter={() => handleInputFocus('projectNameLabel')}
                onMouseLeave={() => handleInputBlur('projectNameLabel')}
            />

            <div>
                <div className="authField">
                    <label>Project Description</label>
                </div>
                <textarea
                    className="textarea-field"
                    title="Project description"
                    id="projectDescription"
                    value={editedRequest.projectDescription}
                    onChange={(e) => setEditedRequest((prev) => ({ ...prev, projectDescription: e.target.value }))}
                    cols="30"
                    rows="10"
                />
            </div>


            <div className="btnSave">
                <button className="deleteBtn" onClick={() => openModalDelete(singleRequest.idProject, handleSomeAction, setModalDeleteIsOpen)}>Delete!</button>
                <button onClick={() => handleUpdateAction(editedRequest, singleRequest.idProject)}>Update!</button>
            </div>
        </div>
    )

export default UpdateRequest;