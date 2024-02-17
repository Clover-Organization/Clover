import { useState, useEffect } from "react";
import Logo from "./assets/PTCC.png";
import user from "./assets/user.png";
import { Link, useLocation } from "react-router-dom";
import { FetchUser } from "../home/components/utils/getInfoUser/FetchUser";
import Settings from "./assets/settings.svg";
import { fetchRequestById } from "../home/components/utils/fetchRequestById/fetchRequestById";

const Navbar = ({ idProject }) => {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});
  const [singleRequest, setSingleRequest] = useState({});
  const location = useLocation();

  const isActive = (path) => {
    return path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  useEffect(() => {
    FetchUser(token, setUserData);
    fetchRequestById(token, idProject, setSingleRequest);
  }, [token]);

  useEffect(() => { }, [userData.profileImage]);
  
  return (
    <header>
      <nav className="navSup">
        <div className="headerLogoName">
          <Link to={"/"}>
            <img src={Logo} alt="clover logo" />
          </Link>
          <div className="userPerfil">
            <Link to={`/Settings`}>
              <img
                src={
                  userData.profileImage
                    ? `data:image/png;base64,${userData.profileImage}`
                    : user
                }
                alt="userImage"
              />
              <h1>{userData.username}</h1>
            </Link>
          </div>
        </div>
        <div className="scroll">
          <nav className={"show"}>
            <ul>
              <li key="overview">
                {idProject !== null && idProject !== undefined ? (
                  <Link
                    to={`/project/${idProject}`}
                    className={isActive("/project") ? "active" : "noActive"}
                  >
                    {singleRequest.projectName}
                  </Link>
                ) : (
                  <Link
                    to={"/"}
                    className={isActive("/") ? "active" : "noActive"}
                  >
                    Overview
                  </Link>
                )}
              </li>
              {idProject !== null && idProject !== undefined && (
                <li key="annotation">
                  <Link
                    to={`/annotation/${idProject}`}
                    className={isActive("/annotation") ? "active" : "noActive"}
                  >
                    Annotation
                  </Link>
                </li>
              )}

              <li key="welcome">
                <Link
                  to={"/Welcome"}
                  className={isActive("/Welcome") ? "active" : "noActive"}
                >
                  Welcome
                </Link>
              </li>
            </ul>
            <ul>
              <li key="settings">
                <Link
                  to={
                    idProject !== null && idProject !== undefined
                      ? `/Settings/${idProject}`
                      : "/Settings"
                  }
                  className={isActive("/Settings") ? "active" : "noActive"}
                >
                  <img src={Settings} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
