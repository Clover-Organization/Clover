import React from "react";

import folderIcon from '../../assets/folderIcon.png';
import { calculateTimeDifference } from "../../../home/components/utils/calculateTimeDifference/CalculateTimeDifference";

const FolderContent = ({ item }) => {


    return (
        <div className="file-folder-content">
            <div className="file-folder">
                <img src={folderIcon} alt="fileIcon" />
                <span>{item.folderName}</span>
            </div>
            <span>{calculateTimeDifference(item.creationFolder, true, true, true, false, false)}</span>
        </div>
    )
}

export default FolderContent;