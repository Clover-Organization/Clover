"use client"; // mandatory

import React, { useState } from "react";
import MultiSelect from "./components/selectMultFile/SelectMultFile";
import { Label } from "@/components/ui/label";


function SelectMultFile({files}) {
    const [selectedFiles, setselectedFiles] = useState([]);

    return (
        <div className="grid gap-4 w-full">
            <Label>Select Files</Label>
            <MultiSelect
                options={files}
                onValueChange={setselectedFiles}
                defaultValue={selectedFiles}
                placeholder="Select Files"
                animation={2}
                variant="inverted"
            />
        </div>
    );
}

export default SelectMultFile;
