import React from "react";

import { calculateTimeDifference } from "../../../home/components/utils/calculateTimeDifference/CalculateTimeDifference";
import { Folder } from "lucide-react";

const FolderContent = ({ item }) => {


    return (
        <div className="file-folder-content">
            <div className="file-folder">
                <Folder width={20}/>
                <span>{item.folderName}</span>
            </div>
            <span>{calculateTimeDifference(item.creationFolder, true, true, true, false, false)}</span>
        </div>
    )
}

export default FolderContent;