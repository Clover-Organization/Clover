import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "../utils/uploadFiles/UploadFiles";
import { uploadFolder } from "../utils/uploadFolder/UploadFolder";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const DropFileZone = ({ idProject, token, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [acceptedFoldersAndFiles, setAcceptedFoldersAndFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        setAcceptedFoldersAndFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    const hasFolder = acceptedFoldersAndFiles.some((item) => item.path && item.path.includes('/'));

    const upload = async () => {
        setLoading(true);

        if (hasFolder) {
            await uploadFolder(token, idProject, acceptedFoldersAndFiles, null);
        } else {
            await uploadFiles(token, idProject, acceptedFoldersAndFiles);
        }

        setLoading(false);
        clearFiles();
    };

    const clearFiles = () => {
        setAcceptedFoldersAndFiles([]);
    };

    const inferFolders = () => {
        const folders = new Set();

        acceptedFoldersAndFiles.forEach((item) => {
            if (item.path) {
                const pathComponents = item.path.split('/');
                pathComponents.pop(); // Remove o nome do arquivo para obter o caminho da pasta

                // Adiciona cada componente do caminho como um possível folder, ignorando strings vazias
                pathComponents.forEach((component) => {
                    if (component.trim() !== '') {
                        folders.add(component);
                    }
                });
            }
        });

        return Array.from(folders);
    };

    const allFolders = inferFolders();
    const firstFolder = allFolders.length > 0 ? allFolders[0] : null;

    return (
        <Card className="p-4">
            <div className="w-full text-end">
                <Button variant="link" size="icon" className="hover:bg-stone-900 w-4 h-4" onClick={onClose}> <X width={20} /></Button>
            </div>
            {loading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            )}
            <div {...getRootProps()}>
                <div className="dropzone">
                    <input {...getInputProps()} />
                    <p>Arraste e solte arquivos aqui ou clique para selecionar.</p>
                </div>
            </div>
            {acceptedFoldersAndFiles.length > 0 && (
                <div className="upload-files">
                    <div className="uploadBtn">
                        <p>Arquivos e pastas Aceitos</p>
                        <div className="addBtn">
                            <button onClick={() => upload()}>Upload</button>
                        </div>
                    </div>
                    {allFolders.length > 0 && (
                        <ul>
                            {allFolders.map((folder, index) => (
                                <li key={index}>{folder}</li>
                            ))}
                        </ul>
                    )}
                    <ul>
                        {acceptedFoldersAndFiles.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    );
};

export default DropFileZone;
