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
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
