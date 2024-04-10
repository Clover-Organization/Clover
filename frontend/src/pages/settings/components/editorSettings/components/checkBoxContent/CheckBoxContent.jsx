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
        // setAutomaticLayout,
        // automaticLayout,
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

                    {/* <Checkbox id="terms1"
                        checked={automaticLayout}
                        onCheckedChange={setAutomaticLayout}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Automatic layout
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether the editor layout should be updated automatically.
                        </p>
                    </div> */}

                    <Checkbox id="terms5"
                        checked={contextmenu}
                        onCheckedChange={setContextmenu}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Context menu
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether the editor context menu should be displayed.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <Checkbox id="terms6"
                        checked={disableLayerHinting}
                        onCheckedChange={setDisableLayerHinting}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Disable layer hinting
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether layer hinting should be disabled.
                        </p>
                    </div>

                    <Checkbox id="terms7"
                        checked={disableMonospaceOptimizations}
                        onCheckedChange={setDisableMonospaceOptimizations}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Disable monospace optimizations
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Defines whether monospaced optimizations should be disabled.
                        </p>

                    </div>
                    <Checkbox id="terms8"
                        checked={dragAndDrop}
                        onCheckedChange={setDragAndDrop}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Drag and drop
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Sets whether drag and drop functionality is enabled.
                        </p>
                    </div>
                </div>
                <div className="items-top flex space-x-2 mt-6">
                    <Checkbox id="terms9"
                        checked={emptySelectionClipboard}
                        onCheckedChange={setEmptySelectionClipboard}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Empty selection clipboard
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Sets whether the clipboard should contain the current line when empty.
                        </p>
                    </div>

                    <Checkbox id="terms10"
                        checked={fixedOverflowWidgets}
                        onCheckedChange={setFixedOverflowWidgets}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Fixed overflow widgets
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Sets whether overflow widgets are sticky.
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

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Cursor blinking
                        </label>
                        <Select onValueChange={setCursorBlinking}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={cursorBlinking}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{cursorBlinking}</SelectLabel> */}
                                    <SelectItem value="blink">blink (Default)</SelectItem>
                                    <SelectItem value="smooth">smooth</SelectItem>
                                    <SelectItem value="phase">phase</SelectItem>
                                    <SelectItem value="expand">expand</SelectItem>
                                    <SelectItem value="solid">solid</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Sets the cursor blinking style.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Cursor smooth caret animation
                        </label>
                        <Select onValueChange={setCursorSmoothCaretAnimation}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={cursorSmoothCaretAnimation}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{cursorSmoothCaretAnimation}</SelectLabel> */}
                                    <SelectItem value="off">off (Default)</SelectItem>
                                    <SelectItem value="explicit">explicit</SelectItem>
                                    <SelectItem value="on">on</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Sets whether cursor smoothing animation is enabled.
                        </p>
                    </div>
                </div>

                <div className="items-top flex space-x-2 mt-6">
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Cursor style
                        </label>
                        <Select onValueChange={setCursorStyle}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={cursorStyle}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>{cursorSmoothCaretAnimation}</SelectLabel> */}
                                    <SelectItem value="line">line (Default)</SelectItem>
                                    <SelectItem value="block">block</SelectItem>
                                    <SelectItem value="underline">underline</SelectItem>
                                    <SelectItem value="line-thin">line-thin</SelectItem>
                                    <SelectItem value="block-outline">block-outline</SelectItem>
                                    <SelectItem value="underline-thin">underline-thin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Sets the cursor style.
                        </p>
                    </div>
                </div>
            </>
        )
    }

export default CheckBoxContent;