import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";
import { commitAndUpdateFile } from "../utils/commitAndUpdateFile/commitAndUpdateFile";
import Modal from "../../../components/Modal";
import InputField from "../../../home/components/inputField/InputField";
import { handleInputBlur, handleInputFocus } from "../../../home/components/utils/handleInput/HandleInput";
import { closeModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";

const FileEditor = ({ singleRequest, fileContent, idProject, idFile }) => {
    const editorRef = useRef(null);
    const token = localStorage.getItem('token')
    const theme = localStorage.getItem('theme');
    const fontSize = localStorage.getItem('fontSize');
    const fontFamily = localStorage.getItem('fontFamily')

    const [newCommitAndFile, setNewCommitAndFile] = useState({ newCommit: '', newFile: null });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    if (fileContent.data === undefined) {
        fileContent.data = "";
    }


    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        if (monaco) {
            editor.addAction({
                id: "myPaste",
                label: "Save",
                keybindings: [
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                ],
                contextMenuGroupId: "0_cutcopypaste",
                contextMenuOrder: 0,

                run: editor => {
                    setModalIsOpen(true);
                }
            });
        }
    }

    const convertContentByFile = (content) => {
        // Obter os dados do conteúdo do arquivo
        const fileContentData = content;

        // Converter os dados para um objeto Blob
        const blob = new Blob([fileContentData], { type: 'application/octet-stream' });

        // Criar um novo objeto File a partir do Blob
        const file = new File([blob], singleRequest.fileName, { type: 'application/octet-stream' });

        // Retornar o objeto File
        return file;
    }

    const sendCommit = async () => {
        // Chamar a função convertContentByFile() para obter o objeto File
        const teste = convertContentByFile(editorRef.current.getValue());

        newCommitAndFile.newFile = teste;

        // Enviar a commit e atualizar o arquivo
        await commitAndUpdateFile(token, idProject, idFile, newCommitAndFile);
        setModalIsOpen(false);
        navigate(`/project/${idProject}`)
    }
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '20px', margin: '50px auto', width: '90%' }}>
                <Editor
                    className="editor-container"
                    height="50vh"
                    width="100%"
                    language={GetLanguageInfos(singleRequest.fileName).name}
                    defaultValue={fileContent.data}
                    theme={theme}
                    onMount={handleEditorDidMount}
                    options={{
                        selectOnLineNumbers: true,
                        scrollBeyondLastLine: false,
                        fontSize: `${fontSize}px`,
                        fontLigatures: true,
                        fontFamily: fontFamily,
                    }}
                />
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                <div className="password-update-modal">

                    <h5>Commit File</h5>
                    <p>Insert your new file</p>

                    <InputField
                        id="commit"
                        label="Commit message"
                        value={newCommitAndFile.newCommit}
                        onChange={(e) => setNewCommitAndFile((prev) => ({ ...prev, newCommit: e.target.value }))}
                        onMouseEnter={() => handleInputFocus('commitLabel')}
                        onMouseLeave={() => handleInputBlur('commitLabel')}
                    />

                    <div className="btnSave">
                        <button onClick={() => sendCommit(newCommitAndFile)}>Send!</button>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default FileEditor;
