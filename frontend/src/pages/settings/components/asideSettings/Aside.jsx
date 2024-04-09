import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Aside = ({ select, setSelect, idProject, isShare }) => {
    const changeSelectNumber = (value) => {
        setSelect(value);
    };

    return (
        <aside className="aside-settings-content">
            <ul className="aside-ul-settings-content">
                <li>
                    <Link onClick={() => changeSelectNumber(0)} className={select === 0 ? "text-secondary-foreground" : "text-secondary-foreground-200"}>
                        <Button variant="ghost" className="w-full justify-start">Profile</Button>
                    </Link>
                </li>
                {idProject !== undefined && isShare == "false" && (
                    <li>
                        <Link onClick={() => changeSelectNumber(1)} className={select === 1 ? "text-secondary-foreground" : "text-secondary-foreground-200"}>
                            <Button variant="ghost" className="w-full justify-start">Project Configurations</Button>
                        </Link>
                    </li>
                )}
                <li>
                    <Link onClick={() => changeSelectNumber(2)} className={select === 2 ? "text-secondary-foreground" : "text-secondary-foreground-200"}>
                        <Button variant="ghost" className="w-full justify-start">Editor Settings</Button>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};
