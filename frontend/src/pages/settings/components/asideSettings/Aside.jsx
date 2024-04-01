import { Link } from "react-router-dom";

export const Aside = ({ select, setSelect, idProject }) => {
    const changeSelectNumber = (value) => {
        setSelect(value);
    };

    return (
        <aside className="aside-settings-content">
            <ul className="aside-ul-settings-content">
                <li>
                    <Link onClick={() => changeSelectNumber(0)} className={select === 0 ? "active text-secondary-foreground" : "noActive text-secondary-foreground"}>
                        Profile
                    </Link>
                </li>
                {idProject !== undefined && (
                    <li>
                        <Link onClick={() => changeSelectNumber(1)} className={select === 1 ? "active text-secondary-foreground" : "noActive text-secondary-foreground"}>
                            Project Configurations
                        </Link>
                    </li>
                )}
                <li>
                    <Link onClick={() => changeSelectNumber(2)} className={select === 2 ? "active text-secondary-foreground" : "noActive text-secondary-foreground"}>
                        Editor Settings
                    </Link>
                </li>
            </ul>
        </aside>
    );
};
