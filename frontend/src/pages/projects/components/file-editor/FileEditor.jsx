import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";

const FileEditor = ({ fileName, fileContent }) => {
    const editorRef = useRef(null);

    const [theme, setTheme] = useState("vs-dark");

    const [fontSize, setFontSize] = useState("26"); // Valor inicial de font size

    const handleFontSizeChange = (e) => {
        setFontSize(parseInt(e.target.value)); // Converte o valor para um número inteiro
    };

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
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
                padding: '8px 12px', // Espaçamento interno
                fontSize: '16px', // Tamanho da fonte
                fontWeight: 'bold', // Negrito
                borderRadius: '4px', // Borda arredondada
                border: '1px solid #ccc', // Borda
                backgroundColor: '#fff', // Cor de fundo
                color: '#000', // Cor do texto
                cursor: 'pointer', // Cursor do mouse
                margin: '15px'
            }}
        >
            
            <option value="vs">vs</option>
            <option value="vs-dark">vs-dark</option>
            <option value="hc-black">hc-black</option>
        </select>
        <span style={{
                color: '#fff',
                fontSize: '16px', // Tamanho da fonte
                fontWeight: 'bold', // Negrito
                marginLeft: '15px'
                }}>
                Font Size:
            </span>
        <select
            id="fontSizeSelect"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            style={{
                padding: '8px 12px', // Espaçamento interno
                fontSize: '16px', // Tamanho da fonte
                fontWeight: 'bold', // Negrito
                borderRadius: '4px', // Borda arredondada
                border: '1px solid #ccc', // Borda
                backgroundColor: '#fff', // Cor de fundo
                color: '#000', // Cor do texto
                cursor: 'pointer', // Cursor do mouse
                margin: '15px'
            }}
        >
            {[...Array(11)].map((_, index) => (
            <option key={index} value={index * 2 + 12}>{index * 2 + 12}px</option>
            ))}
      </select>
      <div style={{display: 'flex', alignItems: 'center', backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '20px', margin: '50px auto', width: '90%'}}>
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
        <>
            <div className="file-content-editor">
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
        </>
    );
};

export default FileEditor;
