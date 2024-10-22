import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { commitAndUpdateFile } from "../utils/commitAndUpdateFile/commitAndUpdateFile";
import { closeModal } from "../../../home/components/utils/ModalFunctions/ModalFunctions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { checkerTheme } from "../file-view/components/utils/checkerTheme/checkerTheme";
import { useTheme } from "@/components/theme-provider";
import { useEffect } from "react";
import { DiffEditor } from "@monaco-editor/react";

const FileEditor = ({ singleRequest, fileContent, idProject, idFile, setShowFileEditor }) => {

    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [editorTheme, setEditorTheme] = useState(checkerTheme(theme));
    const [contentBefore, setContentBefore] = useState(false);
    const [saveContent, setSaveContent] = useState(fileContent.data);
    const [initialContent, setInitialContent] = useState(fileContent.data);

    useEffect(() => {
        setEditorTheme(checkerTheme(theme));
    }, [theme]);

    const editorRef = useRef(null);
    const token = localStorage.getItem('token')
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
                id: "SAVE",
                label: "Save",
                keybindings: [
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                ],
                contextMenuGroupId: "0_cutcopypaste",
                contextMenuOrder: 0,

                run: editor => {
                    setContentBefore(true);
                }
            });
            editor.addAction({
                id: "EXIT-TO-VIEW-EDITOR",
                label: "Exit editor",
                keybindings: [
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE,
                ],
                contextMenuGroupId: "0_cutcopypaste",
                contextMenuOrder: 1,

                run: editor => {
                    setShowFileEditor(false);
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
    }
    const handleDiffEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        if (monaco) {
            editor.addAction({
                id: "SAVE1",
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

            editor.addAction({
                id: "CANCEL_SAVE",
                label: "Cancel",
                keybindings: [
                    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyS,
                ],
                contextMenuGroupId: "0_cutcopypaste",
                contextMenuOrder: 1,

                run: editor => {
                    setContentBefore(false);
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
        setLoading(true);
        // Chamar a função convertContentByFile() para obter o objeto File
        const convertContent = convertContentByFile(saveContent);

        newCommitAndFile.newFile = convertContent;

        // Enviar a commit e atualizar o arquivo
        await commitAndUpdateFile(token, idProject, idFile, newCommitAndFile);
        setModalIsOpen(false);
        setLoading(false);
        navigate(`/project/${idProject}`)
    }

    const handleEditorChange = (value, event) => {
        setSaveContent(value); // Atualiza o estado com o novo valor
    };
    return (
        <div>
            <div className="file-content-editor">
                {contentBefore ? (
                    <>
                        <DiffEditor
                            className="editor-container"
                            height="70vh"
                            width="100%"
                            language={GetLanguageInfos(singleRequest.fileName).name}
                            original={initialContent} // Conteúdo original
                            modified={saveContent} // Conteúdo modificado (mudança)
                            theme={editorTheme}
                            onMount={handleDiffEditorDidMount}
                            options={{
                                renderSideBySide: true, // Renderização lado a lado
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
                    </>
                ) : (
                    <>
                        <Editor
                            className="editor-container"
                            height="70vh"
                            width="100%"
                            language={GetLanguageInfos(singleRequest.fileName).name}
                            defaultValue={saveContent}
                            onChange={handleEditorChange}
                            theme={editorTheme}
                            onMount={handleEditorDidMount}
                            options={{
                                selectOnLineNumbers: true,
                                scrollBeyondLastLine: false,
                                fontSize: `${fontSize}px`,
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
                                fontLigatures: fontLigatures,
                                formatOnPaste: formatOnPaste,
                                formatOnType: formatOnType,
                                glyphMargin: glyphMargin,
                                hideCursorInOverviewRuler: hideCursorInOverviewRuler,
                                letterSpacing: letterSpacing
                            }}
                        />
                    </>
                )}
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => closeModal(setModalIsOpen)}>
                <Card className="w-[350px]">
                    <div className="w-full h-1 p-2 text-end">
                        <Button variant="link" size="icon" className="hover:bg-stone-900 w-4 h-4" onClick={() => closeModal(setModalIsOpen)}> <X width={20} /></Button>
                    </div>
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
                                {!loading ? (
                                    <Button onClick={() => sendCommit(newCommitAndFile)}>Save!</Button>

                                ) : (
                                    <Button disabled>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                )}
                            </div>

                        </div>

                    </CardContent>

                </Card>
            </Modal>
        </div>
    );
};

export default FileEditor;
