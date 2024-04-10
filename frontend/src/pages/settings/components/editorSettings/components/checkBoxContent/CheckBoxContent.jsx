import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CheckBoxContent =
    ({
        setAcceptSuggestionOnEnter,
        acceptSuggestionOnEnter,
        setAutoClosingBrackets,
        autoClosingBrackets,
        setAutoClosingDelete,
        autoClosingDelete,
        setAutoClosingOvertype,
        autoClosingOvertype,
        setAutoClosingQuotes,
        autoClosingQuotes,
        setAutoIndent,
        autoIndent,
        setAutomaticLayout,
        automaticLayout,
        setCodeLens,
        codeLens,
        setContextmenu,
        contextmenu,
        setCursorBlinking,
        cursorBlinking,
        setCursorSmoothCaretAnimation,
        cursorSmoothCaretAnimation,
        setCursorStyle,
        cursorStyle,
        setDisableLayerHinting,
        disableLayerHinting,
        setDisableMonospaceOptimizations,
        disableMonospaceOptimizations,
        setDragAndDrop,
        dragAndDrop,
        setEmptySelectionClipboard,
        emptySelectionClipboard,
        setFixedOverflowWidgets,
        fixedOverflowWidgets,
        setFontLigatures,
        fontLigatures,
        setFormatOnPaste,
        formatOnPaste,
        setFormatOnType,
        formatOnType,
        setFormatOnSave,
        formatOnSave,
        setGlyphMargin,
        glyphMargin,
        setGotoLocation,
        gotoLocation,
        setHideCursorInOverviewRuler,
        hideCursorInOverviewRuler,
        setHighlightActiveIndentGuide,
        highlightActiveIndentGuide,
        setHover,
        hover,
        setLetterSpacing,
        letterSpacing,
        setLightbulb,
        lightbulb,
        setLineDecorationsWidth,
        lineDecorationsWidth,
        setLineNumbers,
        lineNumbers,
    }) => {

        return (
            <>
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1"
                        checked={acceptSuggestionOnEnter}
                        onCheckedChange={setAcceptSuggestionOnEnter}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept suggestion on enter
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether a code suggestion should be automatically accepted when pressing Enter.
                        </p>
                    </div>

                    <Checkbox id="terms3"
                        checked={codeLens}
                        onCheckedChange={setCodeLens}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Code lens
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether the editor layout should be updated automatically.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <Checkbox id="terms1"
                        checked={codeLens}
                        onCheckedChange={setCodeLens}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Code lens
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether codelenses should be displayed.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Auto closing brackets
                        </label>
                        <Select onValueChange={setAutoClosingBrackets}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={autoClosingBrackets}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{autoClosingBrackets}</SelectLabel> */}
                                    <SelectItem value="languageDefined">languageDefined (default)</SelectItem>
                                    <SelectItem value="always">always</SelectItem>
                                    <SelectItem value="beforeWhitespace">beforeWhitespace</SelectItem>
                                    <SelectItem value="never">never</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Defines whether brackets should be automatically closed.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Auto closing delete
                        </label>
                        <Select onValueChange={setAutoClosingDelete}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={autoClosingDelete}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{autoClosingDelete}</SelectLabel> */}
                                    <SelectItem value="auto">auto (Default)</SelectItem>
                                    <SelectItem value="always">always</SelectItem>
                                    <SelectItem value="never">never</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Sets whether to delete auto-closing characters next to the cursor.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Auto closing overtype
                        </label>
                        <Select onValueChange={setAutoClosingOvertype}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={autoClosingOvertype}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{autoClosingOvertype}</SelectLabel> */}
                                    <SelectItem value="auto">auto (Default)</SelectItem>
                                    <SelectItem value="always">always</SelectItem>
                                    <SelectItem value="never">never</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Sets whether to replace auto-closing characters if they are present to the right of the cursor.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Auto closing quotes
                        </label>
                        <Select onValueChange={setAutoClosingQuotes}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={autoClosingQuotes}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{autoClosingQuotes}</SelectLabel> */}
                                    <SelectItem value="languageDefined">languageDefined (Default)</SelectItem>
                                    <SelectItem value="always">always</SelectItem>
                                    <SelectItem value="beforeWhitespace">beforeWhitespace</SelectItem>
                                    <SelectItem value="never">never</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Defines whether quotes should be automatically closed.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Auto indent
                        </label>
                        <Select onValueChange={setAutoIndent}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={autoIndent}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{autoIndent}</SelectLabel> */}
                                    <SelectItem value="advanced">advanced (Default)</SelectItem>
                                    <SelectItem value="full">full</SelectItem>
                                    <SelectItem value="brackets">brackets</SelectItem>
                                    <SelectItem value="keep">keep</SelectItem>
                                    <SelectItem value="none">none</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Sets whether automatic indentation is enabled.
                        </p>
                    </div>
                </div>
            </>
        )
    }

export default CheckBoxContent;