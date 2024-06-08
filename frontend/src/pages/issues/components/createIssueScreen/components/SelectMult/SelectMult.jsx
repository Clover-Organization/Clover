"use client"; // mandatory

import React, { useState } from "react";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import MultiSelect from "./components/selectMultFile/SelectMultFile";
import { Label } from "@/components/ui/label";

const frameworksList = [
    {
        value: "react",
        label: "React",
        icon: Turtle,
    },
    {
        value: "angular",
        label: "Angular",
        icon: Cat,
    },
    {
        value: "vue",
        label: "Vue",
        icon: Dog,
    },
    {
        value: "svelte",
        label: "Svelte",
        icon: Rabbit,
    },
    {
        value: "ember",
        label: "Ember",
        icon: Fish,
    },
];

function SelectMultFile() {
    const [selectedFrameworks, setSelectedFrameworks] = useState(["react", "angular"]);

    return (
        <div className="grid gap-4 w-full">
            <Label>Select Files</Label>
            <MultiSelect
                options={frameworksList}
                onValueChange={setSelectedFrameworks}
                defaultValue={selectedFrameworks}
                placeholder="Select frameworks"
                animation={2}
                variant="inverted"
            />
        </div>
    );
}

export default SelectMultFile;
