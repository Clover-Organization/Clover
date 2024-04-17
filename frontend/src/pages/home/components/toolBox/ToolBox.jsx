import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { isEmpty } from "lodash";

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
                  {box.user.profileImage != null && !isEmpty(box.user.profileImage) ? (
                    <img
                      width={40}
                      className="rounded-full h-10 object-cover"
                      src={`data:image/png;base64,${box.user.profileImage}`}
                      alt="userImage"
                    />
                  ) : (
                    <User width={40} height={40} />
                  )}
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
