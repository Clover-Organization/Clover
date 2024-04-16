import * as React from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Icon from "@/pages/components/Icon";
import logo from "@/pages/components/assets/PTCC.png";
import { useEffect } from "react";
import { FetchUser } from "@/pages/home/components/utils/getInfoUser/FetchUser";
import { fetchRequestById } from "@/pages/home/components/utils/fetchRequestById/fetchRequestById";
import { useState } from "react";

const HomeNavbar = ({ idProject }) => {
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState({});
    const [singleRequest, setSingleRequest] = useState({});
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        FetchUser(token, setUserData);
        fetchRequestById(token, idProject, setSingleRequest);
    }, [token]);

    useEffect(() => { }, [userData.profileImage]);

    return (
        <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
                <Icon src={logo} alt="logo" />
                <span className="hidden font-bold sm:inline-block text-secondary-foreground">
                    Clover
                </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">

                {idProject !== null && idProject !== undefined ? (
                    <Link
                        to={`/project/${idProject}`}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === `/project/${idProject}` ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        {singleRequest.projectName}
                    </Link>
                ) : (
                    <Link
                        to={"/"}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === "/" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Overview
                    </Link>
                )}

                {idProject !== null && idProject !== undefined && (

                    <Link
                        to={`/annotation/${idProject}`}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === `/annotation/${idProject}` ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Annotation
                    </Link>

                )}
                <Link
                    to={`/roadmap`}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/roadmap" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Roadmaps
                </Link>
            </nav>
        </div>
    );
}

export default HomeNavbar;