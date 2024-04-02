import React, { useCallback, useEffect, useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { updateAnnotation } from "../utils/updateAnnotation/UpdateAnnotation";
import { fetchAnnotation } from "./utils/FetchAnnotation";
import { deleteAnnotaion } from "./utils/deleteAnnotaion/deleteAnnotaion";
import { CardTitle } from "@/components/ui/card";
import { DropdownMenuAnnotation } from "./components/dropdownMenu/DropdownMenuAnnotation";
import Modal from "@/pages/components/Modal";
import ModalDeleteAnnotation from "./components/modalDeleteAnnotation/ModalDeleteAnnotation";
import { closeModal, openModal } from "@/pages/home/components/utils/ModalFunctions/ModalFunctions";

const AnnotationContainer = ({ quillRef, selectedAnnotation, idProject, handlePostNewAnnotation, setNewAnnotationName, setModalUpdate }) => {
    const token = localStorage.getItem('token');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent] = useState({
        annotationContent: selectedAnnotation.annotationContent,
    });

    // Define uma função para buscar a anotação quando selectedAnnotation mudar
    const fetchAnnotationAndUpdateContent = useCallback(async () => {
        await fetchAnnotation(token, selectedAnnotation.idAnnotation, setContent);
    }, [token, selectedAnnotation.idAnnotation]);

    // Chama a função sempre que selectedAnnotation mudar
    useEffect(() => {
        fetchAnnotationAndUpdateContent();
    }, [fetchAnnotationAndUpdateContent]);

    useEffect(() => {
        fetchAnnotation(token, selectedAnnotation.idAnnotation, setContent);
    }, []);

    const handleChange = (value) => {
        setContent({ annotationContent: value });
    };

    const handleSaveAnnotation = async () => {
        await updateAnnotation(token, content, selectedAnnotation.idAnnotation, idProject);
    };

    const handleDeleteAnnotation = async () => {
        await deleteAnnotaion(idProject, token, selectedAnnotation.idAnnotation);
        window.location.reload();
    };

    // Adiciona evento para salvar quando pressionar Ctrl + S
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault(); // Evita que o navegador abra o menu de salvar
                handleSaveAnnotation();
            } else if (event.ctrlKey && event.altKey && event.key === 'n') {
                event.preventDefault();
                handlePostNewAnnotation();
            }
            else if (event.key === 'Delete') {
                event.preventDefault();
                openModal(setModalIsOpen)
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSaveAnnotation]);

    return (
        <>
            <div className="nav-annotation">
                <CardTitle title="Two clicks to edit name" onDoubleClick={() => { setModalUpdate(true); setNewAnnotationName({ title: selectedAnnotation.title, id: selectedAnnotation.idAnnotation }); }}>{selectedAnnotation.title}</CardTitle>
                <DropdownMenuAnnotation
                    handleSaveAnnotation={handleSaveAnnotation}
                    openModalDelete={() => openModal(setModalIsOpen)}
                    handlePostNewAnnotation={handlePostNewAnnotation}
                />
            </div>

            <div className="annotation-content text-black">
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
            <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                <ModalDeleteAnnotation
                    onClose={() => closeModal(setModalIsOpen)}
                    handleDeleteAnnotation={handleDeleteAnnotation}
                />
            </Modal>
        </>
    );
};

export default AnnotationContainer;
