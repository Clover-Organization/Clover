import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";


import Navbar from "../../../components/Navbar";
import Modal from "../../../components/Modal";
import FileNav from "./components/file-nav/FileNav";
import FileEditor from "../file-editor/FileEditor";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";
import { useNavigate, useParams } from "react-router-dom";
import { getFilesById } from "../utils/getFilesById/getFilesById";
import { getFileContent } from "../utils/getFileContent/getFileContent";
import { getCommitsByFiles } from "../utils/getCommitsByFiles/GetCommitsByFiles";
import { commitAndUpdateFile } from "../utils/commitAndUpdateFile/commitAndUpdateFile";
import { closeModal, closeModalDelete } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { deleteFileByIdFileAndIdProject } from "../utils/deleteFileByIdFileAndIdProject/deleteFileByIdFileAndIdProject";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkerTheme } from "./components/utils/checkerTheme/checkerTheme";
import { useTheme } from "@/components/theme-provider";
import { DiffEditor } from "@monaco-editor/react";
import { downloadFile } from "../utils/downloadFile/downloadFile";
import RendererFile from "./components/rendererFile/RendererFile";
import { toast } from "sonner";

const FileView = () => {
    const token = localStorage.getItem('token');
    const fontSize = localStorage.getItem('fontSize');
    const fontFamily = localStorage.getItem('fontFamily');
    const acceptSuggestionOnEnter = localStorage.getItem('acceptSuggestionOnEnter');
    const autoClosingBrackets = localStorage.getItem('autoClosingBrackets');
    const autoClosingDelete = localStorage.getItem('autoClosingDelete');
    const autoClosingOvertype = localStorage.getItem('autoClosingOvertype');
    const autoClosingQuotes = localStorage.getItem('autoClosingQuotes');
    const autoIndent = localStorage.getItem('autoIndent');
    const codeLens = localStorage.getItem('codeLens');
    const contextmenu = localStorage.getItem('contextmenu');
    const cursorBlinking = localStorage.getItem('cursorBlinking');
    const cursorSmoothCaretAnimation = localStorage.getItem('cursorSmoothCaretAnimation');
    const cursorStyle = localStorage.getItem('cursorStyle');
    const disableLayerHinting = localStorage.getItem('disableLayerHinting');
    const disableMonospaceOptimizations = localStorage.getItem('disableMonospaceOptimizations');
    const dragAndDrop = localStorage.getItem('dragAndDrop');
    const emptySelectionClipboard = localStorage.getItem('emptySelectionClipboard');
    const fixedOverflowWidgets = localStorage.getItem('fixedOverflowWidgets');
    const fontLigatures = localStorage.getItem('fontLigatures');
    const formatOnPaste = localStorage.getItem('formatOnPaste');
    const formatOnType = localStorage.getItem('formatOnType');
    const glyphMargin = localStorage.getItem('glyphMargin');
    const hideCursorInOverviewRuler = localStorage.getItem('hideCursorInOverviewRuler');
    const letterSpacing = localStorage.getItem('letterSpacing');
    const { idProject, idFile, idFolder } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        await commitAndUpdateFile(token, idProject, idFile, newCommitAndFile);
        cls();
        setStateModal(true)
        setLoading(false);
        navigate(`/project/${idProject}`)
    }

    const cls = () => {
        setNewCommitAndFile({
            newCommit: "",
            newFile: null,
        });
    }

    const handleDeleteAction = async (id) => {
        await deleteFileByIdFileAndIdProject(token, id, idProject, idFolder);
        navigate(`/project/${idProject}`)
    }

    const handleGetAllCommitsAction = async () => {
        await getCommitsByFiles(token, idFile, setCommitsRequest);
        setShowCommits(!showCommits)
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

        editor.addAction({
            id: "myPaste",
            label: "Editor",
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE,
            ],
            contextMenuGroupId: "0_cutcopypaste",
            contextMenuOrder: 0,

            run: editor => {
                setShowFileEditor(true);
            }
        });
        editor.addAction({
            id: 'OPEN_SETTINGS',
            label: 'Settings editor',
            contextMenuGroupId: "0_cutcopypaste",
            contextMenuOrder: 2,
            run: (ed) => {
                navigate(`/settings/${idProject}/2`);
            }
        })
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

    const handleDownloadFile = async () => {
        await downloadFile(token, idFile, idProject, singleRequest);
    }

    const CopyToClipboard = () => {
        navigator.clipboard.writeText(fileContent.data).then(() => {
            toast.success("Sucess!", {
                description: "File copied to clipboard!"
            });
        }).catch((error) => {
            toast.error("Error!", {
                description: `Error Details: ${error.message}`
            });
        });
    }

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
                        isEditing={showFileEditor}
                        showFileEditor={showFileEditor}
                        handleDownloadFile={handleDownloadFile}
                        CopyToClipboard={CopyToClipboard}
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
                                    {showCommitsSelected.changes && showCommitsSelected.changes.contentType === "image" ? (
                                        <div className="image-content">
                                            <img src={showCommitsSelected.changes} alt="image" />
                                        </div>
                                    ) : (
                                        <div className="file-content-editor flex">
                                            <DiffEditor
                                                className="editor-container"
                                                height="70vh"
                                                width="100%"
                                                language={GetLanguageInfos(singleRequest.fileName).name}
                                                original={fileContent.data}
                                                modified={showCommitsSelected.changes}
                                                theme={editorTheme}
                                                options={{
                                                    renderSideBySide: true,
                                                    selectOnLineNumbers: true,
                                                    scrollBeyondLastLine: false,
                                                    fontSize: `${fontSize}px`,
                                                    fontLigatures: fontLigatures,
                                                    readOnly: true,
                                                    fontFamily: fontFamily,
                                                    acceptSuggestionOnEnter: acceptSuggestionOnEnter,
                                                    autoClosingBrackets: autoClosingBrackets,
                                                    autoClosingDelete: autoClosingDelete,
                                                    autoClosingOvertype: autoClosingOvertype,
                                                    autoClosingQuotes: autoClosingQuotes,
                                                    autoIndent: autoIndent,
                                                    codeLens: codeLens,
                                                    contextmenu: contextmenu,
                                                    cursorBlinking: cursorBlinking,
                                                    cursorSmoothCaretAnimation: cursorSmoothCaretAnimation,
                                                    cursorStyle: cursorStyle,
                                                    disableLayerHinting: disableLayerHinting,
                                                    disableMonospaceOptimizations: disableMonospaceOptimizations,
                                                    dragAndDrop: dragAndDrop,
                                                    emptySelectionClipboard: emptySelectionClipboard,
                                                    fixedOverflowWidgets: fixedOverflowWidgets,
                                                    formatOnPaste: formatOnPaste,
                                                    formatOnType: formatOnType,
                                                    glyphMargin: glyphMargin,
                                                    hideCursorInOverviewRuler: hideCursorInOverviewRuler,
                                                    letterSpacing: letterSpacing,
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {showFileEditor ? (
                                        <FileEditor
                                            singleRequest={singleRequest}
                                            fileContent={fileContent}
                                            idProject={idProject}
                                            idFile={idFile}
                                            setShowFileEditor={setShowFileEditor}
                                        />
                                    ) : (
                                        <>
                                            {singleRequest.fileName && GetLanguageInfos(singleRequest.fileName).name === "Undefined" || singleRequest.fileName && GetLanguageInfos(singleRequest.fileName).name === "md" ? (
                                                <RendererFile fileContent={fileContent} singleRequest={singleRequest} />
                                            ) : (
                                                <>
                                                    {fileContent.data && (
                                                        <div className="file-content-editor">
                                                            <Editor
                                                                className="editor-container"
                                                                height="70vh"
                                                                width="100%"
                                                                language={singleRequest.fileName && GetLanguageInfos(singleRequest.fileName).name}
                                                                defaultValue={fileContent.data}
                                                                theme={editorTheme}
                                                                onMount={handleEditorDidMount}
                                                                options={{
                                                                    selectOnLineNumbers: true,
                                                                    scrollBeyondLastLine: false,
                                                                    fontSize: `${fontSize}px`,
                                                                    fontLigatures: fontLigatures,
                                                                    fontFamily: fontFamily,
                                                                    readOnly: true,
                                                                    acceptSuggestionOnEnter: acceptSuggestionOnEnter,
                                                                    autoClosingBrackets: autoClosingBrackets,
                                                                    autoClosingDelete: autoClosingDelete,
                                                                    autoClosingOvertype: autoClosingOvertype,
                                                                    autoClosingQuotes: autoClosingQuotes,
                                                                    autoIndent: autoIndent,
                                                                    codeLens: codeLens,
                                                                    contextmenu: contextmenu,
                                                                    cursorBlinking: cursorBlinking,
                                                                    cursorSmoothCaretAnimation: cursorSmoothCaretAnimation,
                                                                    cursorStyle: cursorStyle,
                                                                    disableLayerHinting: disableLayerHinting,
                                                                    disableMonospaceOptimizations: disableMonospaceOptimizations,
                                                                    dragAndDrop: dragAndDrop,
                                                                    emptySelectionClipboard: emptySelectionClipboard,
                                                                    fixedOverflowWidgets: fixedOverflowWidgets,
                                                                    formatOnPaste: formatOnPaste,
                                                                    formatOnType: formatOnType,
                                                                    glyphMargin: glyphMargin,
                                                                    hideCursorInOverviewRuler: hideCursorInOverviewRuler,
                                                                    letterSpacing: letterSpacing
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Modal isOpen={modalDeleteIsOpen} onClose={() => closeModalDelete(setModalDeleteIsOpen)}>
                <Card>
                    <div className="w-full h-1 p-2 text-end">
                        <Button variant="link" size="icon" className="hover:bg-stone-900 w-4 h-4" onClick={() => closeModal(setModalDeleteIsOpen)}> <X width={20} /></Button>
                    </div>
                    <CardHeader>
                        <CardTitle>Are you absolutely sure?</CardTitle>
                        <CardDescription>
                            This action cannot be undone. This will permanently delete your
                            file and the data contained in it
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="flex justify-end">
                        <Button variant="destructive" onClick={() => handleDeleteAction(singleRequest.idFile)}>Continue</Button>
                    </CardFooter>
                </Card>
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
                                        {!loading ? (

                                            <Button onClick={() => sendCommit(newCommitAndFile)}>Send!</Button>
                                        ) : (
                                            <Button disabled>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Please wait
                                            </Button>
                                        )}
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
