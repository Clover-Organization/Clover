import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FiltersNotifications from "./components/filtersNotifications/FiltersNotifications";

const HeaderNotification = ({ notifications, filter, setFilter, filterBy, setFilterBy, handleAllNotifications }) => {
    return (
        <header className="mx-auto grid w-full max-w-6xl border-solid border p-8 gap-4 rounded-sm">
            <div className="w-full flex flex-wrap justify-between gap-8">
                <h1 className="text-3xl font-semibold">Notifications</h1>
                <div className="w-full md:w-1/3 relative">
                    <Search className="absolute top-2 left-3 bg-background" width={20} />
                    <Input
                        className="indent-8"
                        placeholder="Search..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex">
                <FiltersNotifications filterBy={filterBy} setFilterBy={setFilterBy} handleAllNotifications={handleAllNotifications} />
            </div>
        </header>
    );
};

export default HeaderNotification;
