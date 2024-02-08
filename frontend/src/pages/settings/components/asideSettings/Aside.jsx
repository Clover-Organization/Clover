import { Link } from "react-router-dom";

export const Aside = ({ select, setSelect, idProject }) => {
    const changeSelectNumber = (value) => {
        setSelect(value);
    };

    return (
        <aside className="aside-settings-content">
            <ul className="aside-ul-settings-content">
                <li>
                    <Link onClick={() => changeSelectNumber(0)} className={select === 0 ? "active" : "noActive"}>
                        Profile
                    </Link>
                </li>
                {idProject !== undefined && (
                    <li>
                        <Link onClick={() => changeSelectNumber(1)} className={select === 1 ? "active" : "noActive"}>
                            Project Configurations
                        </Link>
                    </li>
                )}
            </ul>
        </aside>
    );
};
