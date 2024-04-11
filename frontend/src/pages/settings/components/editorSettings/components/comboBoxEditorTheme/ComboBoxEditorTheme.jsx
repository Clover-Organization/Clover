import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ComboBoxEditorTheme({ theme, setTheme }) {

    return (
        <>
            <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Theme
            </label>
            <Select onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={theme}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Themes</SelectLabel>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="vs">Vs</SelectItem>
                        <SelectItem value="vs-dark">Vs-dark</SelectItem>
                        <SelectItem value="hc-black">Hc-black</SelectItem>
                        <SelectItem value="hc-light">Hc-light</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
