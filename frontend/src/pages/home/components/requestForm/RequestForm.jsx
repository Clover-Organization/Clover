// RequestForm.jsx

import React from 'react';
import InputField from '../inputField/InputField';
import { handleInputBlur, handleInputFocus } from '../utils/handleInput/HandleInput';

const RequestForm = ({ formData, setFormData, handleSave }) => {
    return (
        <div className="toolConfig">
            <InputField
                id="projectName"
                label="Project name"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
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
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    cols="30"
                    rows="10"
                />
            </div>

            <div className="btnSave">
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default RequestForm;
