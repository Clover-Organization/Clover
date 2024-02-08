import { Link } from "react-router-dom";
import user from "../../assets/user.png";
import { openModalConfirm } from "../utils/ModalFunctions/ModalFunctions";
import { calculateTimeDifference } from "../utils/calculateTimeDifference/CalculateTimeDifference";

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
                <h2>{box.projectName}</h2>
                {/* <p> {box.idProject}</p> */}
                <p>
                  {calculateTimeDifference(
                    box.creationDate,
                    true,
                    true,
                    true,
                    false
                  )}
                </p>
              </div>
              <div className="dateStatusTool">
                <div className="user-info">
                  {/* <p>
                                        {showId ? 'ID' : 'Username'}: {box.user ? (showId ? box.user.idUsers : box.user.username) : 'N/A'}
                                    </p> */}
                </div>
                <div className="box-status-priority-image-content">
                  <img
                    src={
                      box.user
                        ? `data:image/png;base64,${box.user.profileImage}`
                        : user
                    }
                  />
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
