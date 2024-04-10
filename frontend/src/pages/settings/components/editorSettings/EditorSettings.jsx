import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ComboBoxEditorTheme } from "./components/comboBoxEditorTheme/ComboBoxEditorTheme";
import { Separator } from "@/components/ui/separator";
import SelectFontFamilyEditor from "./components/SelectFontFamilyEditor/SelectFontFamilyEditor";
import CheckBoxContent from "./components/checkBoxContent/CheckBoxContent";

const EditorSettings = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : '18');
    const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') ? localStorage.getItem('fontFamily') : 'JetBrains Mono');
    const [acceptSuggestionOnEnter, setAcceptSuggestionOnEnter] = useState(localStorage.getItem('acceptSuggestionOnEnter') ? JSON.parse(localStorage.getItem('acceptSuggestionOnEnter')) : true);
    const [autoClosingBrackets, setAutoClosingBrackets] = useState(localStorage.getItem('autoClosingBrackets') ? localStorage.getItem('autoClosingBrackets') : 'beforeWhitespaceLanguageDefined');

    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('acceptSuggestionOnEnter', acceptSuggestionOnEnter);
    localStorage.setItem('autoClosingBrackets', autoClosingBrackets);

    return (
        <article className="article-settings-content">
            <div className="div-user-content">
                <div className='my-6'>
                    <CardTitle>Editor Configuration</CardTitle>
                    <CardDescription>File Editor Settings</CardDescription>
                </div>
                <div className="user-info-image-content">
                    <div className="excel-file-generator editor-settings-menu">
                        <CardTitle>Theme Editor</CardTitle>
                        <CardDescription>Choose your editor theme color</CardDescription>
                        <Separator className="my-4" />
                        <CardContent>
                            <ComboBoxEditorTheme
                                theme={theme}
                                setTheme={setTheme}
                            />
                        </CardContent>

                        <CardTitle>Font Editor</CardTitle>
                        <CardDescription>Choose your editor font-family or font-size</CardDescription>
                        <Separator className="my-4" />
                        <CardContent>
                            <SelectFontFamilyEditor
                                fontFamily={fontFamily}
                                setFontFamily={setFontFamily}
                                fontSize={fontSize}
                                setFontSize={setFontSize}
                            />
                        </CardContent>

                        <CardTitle>Text Editor</CardTitle>
                        <CardDescription>Choose your editor font-family or font-size</CardDescription>
                        <Separator className="my-4" />
                        <CardContent>
                            <CheckBoxContent
                                setAcceptSuggestionOnEnter={setAcceptSuggestionOnEnter}
                                acceptSuggestionOnEnter={acceptSuggestionOnEnter}
                                setAutoClosingBrackets={setAutoClosingBrackets}
                                autoClosingBrackets={autoClosingBrackets}
                            />
                        </CardContent>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default EditorSettings;