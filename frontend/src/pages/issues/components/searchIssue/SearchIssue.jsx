import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchIssue = ({ filter, setFilter }) => {
    return(
        <div className="w-full md:w-1/2 relative">
            <Search className="absolute top-2 left-3 bg-background" width={20} />
            <Input
                className="indent-8"
                placeholder="Search..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
        </div>
    )
}

export default SearchIssue;