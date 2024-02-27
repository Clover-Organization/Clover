import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";

const FileEditor = ({ fileName, fileContent }) => {
    const editorRef = useRef(null);
    const theme = localStorage.getItem('theme');
    const fontSize = localStorage.getItem('fontSize');

    if (fileContent === undefined) {
        fileContent = "";
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current.getValue());
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '20px', margin: '50px auto', width: '90%' }}>
                <Editor
                    className="editor-container"
                    height="50vh"
                    width="100%"
                    language={GetLanguageInfos(fileName).name}
                    defaultValue={fileContent}
                    theme={theme}
                    onMount={handleEditorDidMount}
                    options={{
                        selectOnLineNumbers: true,
                        scrollBeyondLastLine: false,
                        fontSize: `${fontSize}px`,
                        fontLigatures: true,
                        fontFamily: "JetBrains Mono",
                    }}
                />
            </div>
        </div>
    );
};

export default FileEditor;
