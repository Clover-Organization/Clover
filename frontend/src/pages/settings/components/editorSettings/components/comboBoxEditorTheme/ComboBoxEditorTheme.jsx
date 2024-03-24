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
import { CardDescription } from "@/components/ui/card"

export function ComboBoxEditorTheme({ theme, setTheme }) {

    return (
        <>
            <CardDescription>Theme</CardDescription>
            <Select onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue
                        placeholder={theme}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Themes</SelectLabel>
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
