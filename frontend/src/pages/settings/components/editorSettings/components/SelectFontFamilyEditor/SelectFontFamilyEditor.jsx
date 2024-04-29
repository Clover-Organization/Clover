import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";

const SelectFontFamilyEditor = ({ fontFamily, setFontFamily, fontSize, setFontSize }) => {
    return (
        <>
            <div>
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Font-Family
                </label>
                <Select onValueChange={setFontFamily}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={fontFamily}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Font-Family</SelectLabel>
                            <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                            <SelectItem value="system-ui">System-ui</SelectItem>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Sans-Serif">Sans-Serif</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Font-Size
                </label>
                <Select onValueChange={setFontSize}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={fontSize}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Font size</SelectLabel>
                            {[...Array(11)].map((_, index) => (
                                <SelectItem key={index} value={index * 2 + 12}>{index * 2 + 12}px</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

export default SelectFontFamilyEditor;