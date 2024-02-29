import { useState } from "react";

const EditorSettings = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'vs-dark');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : '18');
    const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') ? localStorage.getItem('fontFamily') : 'JetBrains Mono');

    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontFamily', fontFamily);

    return (
        <article className="article-settings-content">
            <div className="div-user-content">
                <h2>Editor Settings</h2>
                <div className="user-info-image-content">
                    <div className="editor-settings-menu">
                        <span className="editor-span-content">
                            Theme:
                        </span>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="select-theme"
                        >
                            <option value="vs">vs</option>
                            <option value="vs-dark">vs-dark</option>
                            <option value="hc-black">hc-black</option>
                        </select>
                        <span className="editor-span-content">
                            Font-Family:
                        </span>
                        <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="select-theme"
                        >
                            <option value="JetBrains Mono">JetBrains Mono</option>
                            <option value="system-ui">system-ui</option>
                            <option value="Arial">Arial</option>
                            <option value="Sans-Serif">Sans-Serif</option>
                        </select>
                        <span className="editor-span-content">
                            Font Size:
                        </span>
                        <select
                            id="fontSizeSelect"
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            className="select-theme"
                        >
                            {[...Array(11)].map((_, index) => (
                                <option key={index} value={index * 2 + 12}>{index * 2 + 12}px</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default EditorSettings;