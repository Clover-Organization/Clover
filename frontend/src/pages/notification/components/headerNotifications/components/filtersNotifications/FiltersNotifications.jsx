import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const FiltersNotifications = ({ filterBy, setFilterBy, handleAllNotifications }) => {
    const handleFilterChange = (value) => {
        setFilterBy(value);
        handleAllNotifications(value);
    };

    return (
        <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
                <Filter width={20} />
                <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filter by:</SelectLabel>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="creationDate">Creation date</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default FiltersNotifications;
