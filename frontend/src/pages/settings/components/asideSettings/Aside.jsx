import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Aside = ({ select, setSelect, idProject, isShare }) => {
    const changeSelectNumber = (value) => {
        setSelect(value);
    };

    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
            <Link href="#" onClick={() => changeSelectNumber(0)} className={select == "0" && "font-semibold text-primary"}>Profile</Link>
            {idProject !== undefined && isShare == "false" && (
                <Link href="#" onClick={() => changeSelectNumber(1)} className={select == "1" && "font-semibold text-primary"}>Project Configurations</Link>
            )}
            <Link href="#" onClick={() => changeSelectNumber(2)} className={select == "2" && "font-semibold text-primary"}>Editor Settings</Link>
        </nav>
    );
};
