import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";


import Navbar from "../../../components/Navbar";
import Modal from "../../../components/Modal";
import FileNav from "./components/file-nav/FileNav";
import FileEditor from "../file-editor/FileEditor";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";
import { useParams } from "react-router-dom";
import { getFilesById } from "../utils/getFilesById/getFilesById";
import { getFileContent } from "../utils/getFileContent/getFileContent";
import { getCommitsByFiles } from "../utils/getCommitsByFiles/GetCommitsByFiles";
import { commitAndUpdateFile } from "../utils/commitAndUpdateFile/commitAndUpdateFile";
import { closeModal, closeModalDelete } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { deleteFileByIdFileAndIdProject } from "../utils/deleteFileByIdFileAndIdProject/deleteFileByIdFileAndIdProject";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkerTheme } from "./components/checkerTheme/checkerTheme";
import { useTheme } from "@/components/theme-provider";
import { DiffEditor } from "@monaco-editor/react";

const FileView = () => {
    const token = localStorage.getItem('token');
    const fontSize = localStorage.getItem('fontSize');
    const fontFamily = localStorage.getItem('fontFamily');
    const { idProject, idFile, idFolder } = useParams();

    const [singleRequest, setSingleRequest] = useState({});
    const [fileContent, setFileContent] = useState({ contentType: "", data: "" });
    const [commitsRequest, setCommitsRequest] = useState([]);
    const [showCommits, setShowCommits] = useState(false);
    const [showCommitsSelected, setShowCommitsSelected] = useState({
        selectedCommit: false,
        commitMessage: "",
        changes: null,
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [newCommitAndFile, setNewCommitAndFile] = useState({
        newCommit: "",
        newFile: null,
    });

    const editorRef = useRef(null);
    const [stateModal, setStateModal] = useState(true);
    const [showFileEditor, setShowFileEditor] = useState(false);

    const getFileAndContent = async () => {
        await getFilesById(token, idFile, setSingleRequest);
        await getFileContent(token, idProject, idFile, setFileContent);
    };

    useEffect(() => {
        getFileAndContent();
    }, []);

    const sendCommit = async () => {
        await commitAndUpdateFile(token, idProject, idFile, newCommitAndFile);
        cls();
        setStateModal(true)
    }

    const cls = () => {
        setNewCommitAndFile({
            newCommit: "",
            newFile: null,
        });
    }

    const handleDeleteAction = async (id) => {
        await deleteFileByIdFileAndIdProject(token, id, idProject, idFolder);
    }

    const handleGetAllCommitsAction = async () => {
        await getCommitsByFiles(token, idFile, setCommitsRequest);
        setShowCommits(true);
    }

    const handleShowCommitsAction = (commit) => {
        setShowCommits(false);
        let decodedChanges = null;
        if (commit.version && commit.version.changes) {
            try {
                decodedChanges = atob(commit.version.changes);
            } catch (error) {
                console.error('Erro ao decodificar as mudanças:', error);
            }
        }

        setShowCommitsSelected({
            selectedCommit: true,
            commitMessage: commit.commitMessage,
            changes: decodedChanges,
        });
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }


    const handleShowFileEditor = () => {
        if (showFileEditor) {
            setShowFileEditor(false);
        } else { setShowFileEditor(true); }

    }

    const { theme } = useTheme();
    const [editorTheme, setEditorTheme] = useState(checkerTheme(theme));
    useEffect(() => {
        setEditorTheme(checkerTheme(theme));
    }, [theme]);

    return (
        <main className="main-file-view">
            <Navbar idProject={idProject} />
            <div className="projectFiles-sc-max">
                <nav className="file-nav">
                    <FileNav
                        singleRequest={singleRequest}
                        setModalIsOpen={setModalIsOpen}
                        setModalDeleteIsOpen={setModalDeleteIsOpen}
                        handleGetAllCommitsAction={handleGetAllCommitsAction}
                        showCommit={showCommitsSelected.commitMessage}
                        setShowCommits={setShowCommits}
                        setCommitNull={() => setShowCommitsSelected({ selectedCommit: false, commitMessage: "", changes: null })}
                        handleShowFileEditor={handleShowFileEditor}
                        showFileEditor={showFileEditor}
                    />
                </nav>

                <hr className="hr-project-title" />

                <div className="projects-files-content">
                    {showCommits ? (
                        <>
                            <div className="file-content">
                                <pre className="pre-format">
                                    {Array.isArray(commitsRequest) && commitsRequest.length > 0 && (
                                        commitsRequest.map((commit) => (
                                            <React.Fragment key={commit.idCommit}>
                                                <div className="commits-content text-secondary-foreground" onClick={() => handleShowCommitsAction(commit)}>
                                                    {commit.commitMessage}
                                                </div>
                                                <hr className="hr-project-title" />
                                            </React.Fragment>
                                        ))
                                    )}
                                </pre>
                            </div>
                        </>
                    ) : (
                        <>
                            {showCommitsSelected.selectedCommit ? (
                                <>
                                    {
                                        showCommitsSelected.changes.contentType === "image" ? (
                                            <div className="image-content">
                                                <img src={showCommits.changes} alt="image" />
                                            </div>
                                        ) : (
                                            <div className="file-content-editor flex">
                                                <DiffEditor
                                                    className="editor-container"
                                                    height="70vh"
                                                    width="100%"
                                                    language={GetLanguageInfos(singleRequest.fileName).name}
                                                    original={fileContent.data} // Conteúdo original
                                                    modified={showCommitsSelected.changes} // Conteúdo modificado (mudança)
                                                    theme={editorTheme}
                                                    options={{
                                                        renderSideBySide: true, // Renderização lado a lado
                                                        selectOnLineNumbers: true,
                                                        scrollBeyondLastLine: false,
                                                        fontSize: `${fontSize}px`,
                                                        fontLigatures: true,
                                                        fontFamily: fontFamily,
                                                        readOnly: true
                                                    }}
                                                />
                                            </div>

                                        )
                                    }
                                </>
                            ) : (
                                <>

                                    {showFileEditor ? (
                                        <FileEditor
                                            singleRequest={singleRequest}
                                            fileContent={fileContent}
                                            idProject={idProject}
                                            idFile={idFile}
                                        />
                                    ) :
                                        fileContent.contentType === "image" ? (
                                            <div className="image-content">
                                                <img src={fileContent.data} alt={singleRequest.fileName} />
                                            </div>
                                        ) : (
                                            <>
                                                {fileContent.data && (
                                                    <div className="file-content-editor">
                                                        <Editor
                                                            className="editor-container"
                                                            height="70vh"
                                                            width="100%"
                                                            language={GetLanguageInfos(singleRequest.fileName).name}
                                                            defaultValue={fileContent.data}
                                                            theme={editorTheme}
                                                            onMount={handleEditorDidMount}
                                                            options={{
                                                                selectOnLineNumbers: true,
                                                                scrollBeyondLastLine: false,
                                                                fontSize: `${fontSize}px`,
                                                                fontLigatures: true,
                                                                fontFamily: fontFamily,
                                                                readOnly: true
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Modal isOpen={modalDeleteIsOpen} onClose={() => closeModalDelete(setModalDeleteIsOpen)}>
                <div className="userPreview">
                    <div className="password-update-modal">
                        <h5>Deseja deletar o arquivo com o ID:</h5>
                        <p>{singleRequest.idFile}</p>
                    </div>

                    <div className="btnSave">
                        <button className="deleteBtn" onClick={() => handleDeleteAction(singleRequest.idFile)}>Delete!</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                <Card className="w-[350px]">
                    <div className="w-full h-1 p-2 text-end">
                        <Button variant="link" size="icon" className="hover:bg-stone-900 w-4 h-4" onClick={() => closeModal(setModalIsOpen)}> <X width={20} /></Button>
                    </div>
                    {stateModal ? (
                        <>
                            <CardHeader>
                                <CardTitle>Commit File</CardTitle>
                                <CardDescription>Enter a descriptive message</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5 gap-4">
                                        <div>
                                            <Label htmlFor="name">New commit</Label>
                                            <Input
                                                id="commit"
                                                placeholder="New commit"
                                                value={newCommitAndFile.newCommit}
                                                onChange={(e) => setNewCommitAndFile((prev) => ({ ...prev, newCommit: e.target.value }))}
                                            />
                                        </div>
                                        <Button onClick={() => setStateModal(false)}>Save!</Button>
                                    </div>

                                </div>
                            </CardContent>

                        </>
                    ) : (
                        <>
                            <CardHeader>
                                <CardTitle>Commit File</CardTitle>
                                <CardDescription>Insert your new file</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5 gap-4">
                                        <div>
                                            <Label htmlFor="file">File</Label>
                                            <Input
                                                id="file"
                                                type="file"
                                                onChange={(e) => setNewCommitAndFile((prev) => ({ ...prev, newFile: e.target.files[0] }))}
                                            />
                                        </div>
                                        <Button onClick={() => sendCommit(newCommitAndFile)}>Send!</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    )}
                </Card>
            </Modal>
        </main>
    );
};

export default FileView;
