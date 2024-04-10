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
        autoClosingBrackets
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
                                    <SelectItem value="beforeWhitespaceLanguageDefined">beforeWhitespaceLanguageDefined (Default)</SelectItem>
                                    <SelectItem value="always">always</SelectItem>
                                    <SelectItem value="languageDefined">languageDefined</SelectItem>
                                    <SelectItem value="beforeWhitespace">beforeWhitespace</SelectItem>
                                    <SelectItem value="languageDefinedOrDefault">languageDefinedOrDefault</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Defines whether brackets should be automatically closed.
                        </p>
                    </div>
                </div>
            </>
        )
    }

export default CheckBoxContent;