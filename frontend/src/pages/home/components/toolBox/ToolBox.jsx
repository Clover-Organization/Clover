import { Link } from "react-router-dom";
import user from "../../assets/user.png";

export const ToolBox = ({ box, loading, showId, role }) => {
  return (
    <div className="tool">
      {loading ? (
        <div className="align-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="txtAlignTool">
            <Link to={`/project/${box.idProject}`}>
              <div className="toolTitle">
                <div className="box-status-priority-image-content">
                  <h2>{box.projectName}</h2>
                  <img
                    src={
                      box.user
                        ? `data:image/png;base64,${box.user.profileImage}`
                        : user
                    }
                  />
                </div>
                <hr className="hrToolBox" />
                <p className="m-2">{box.projectDescription}</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
