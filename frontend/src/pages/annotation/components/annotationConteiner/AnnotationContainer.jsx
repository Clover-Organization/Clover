import React, { useEffect, useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateAnnotation } from "../utils/updateAnnotation/UpdateAnnotation";
import { fetchAnnotation } from "./utils/FetchAnnotation";

const AnnotationContainer = ({ quillRef, selectedAnnotation, idProject }) => {
    const token = localStorage.getItem('token');
    const [content, setContent] = useState({
        annotationContent: ""
    })

    const handleSaveAnnotation = async () => {
        // Usa diretamente o estado atualizado na função de atualização
        await updateAnnotation(token, content, selectedAnnotation.idAnnotation, idProject);
    }

    useEffect(() => {
        fetchAnnotation(token, selectedAnnotation.idAnnotation, setContent);
    }, []);


    const handleChange = (value) => {
        setContent({ annotationContent: value });
    };

    return (
        <>
            <div className="nav-annotation">
                <h2>{selectedAnnotation.title}</h2>
                <div className="btnSave">
                    <button onClick={() => handleSaveAnnotation()}>Save</button>
                </div>
            </div>

            <div className="annotation-content">
                <ReactQuill
                    className="reactQuill"
                    ref={quillRef}
                    theme="snow"
                    value={content.annotationContent}
                    onChange={handleChange}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'align': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            ['blockquote', 'code-block'],
                            ['link', 'image', 'video'],
                            ['clean'],
                        ],
                    }}
                />
            </div>
        </>
    )
}

export default AnnotationContainer;