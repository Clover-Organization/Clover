import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

const SearchIssue = ({ filter, setFilter, setFilterBy }) => {
    const handleFilterChange = (value) => {
        setFilterBy(value);
    };

    return (
        <div className="w-full md:w-1/2 relative flex flex-wrap md:flex-nowrap gap-4">
            <Search className="absolute top-2 left-3 bg-background" width={20} />
            <Input
                className="indent-8"
                placeholder="Search..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                    <Filter width={20} />
                    <SelectValue placeholder="Open" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Filter by:</SelectLabel>
                        <SelectItem value="true">Open</SelectItem>
                        <SelectItem value="false">Closed</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SearchIssue;
