import React, { useEffect, useState } from "react"

import { calculateTimeDifference } from "../../../home/components/utils/calculateTimeDifference/CalculateTimeDifference"
import { getCommitsByFiles } from "../utils/getCommitsByFiles/GetCommitsByFiles";
import GetLanguageInfos from "../utils/getLanguageInfo/GetLanguageInfos";

const FileContent = ({ item, token }) => {


    const [commitsRequest, setCommitsRequest] = useState([]);

    useEffect(() => {
        getCommits();
    }, []);

    const getCommits = async () => {
        await getCommitsByFiles(token, item.idFile, setCommitsRequest);
    }

    return (
        <div className="file-folder-content">
            <div className="file-folder">
                <img src={GetLanguageInfos(item.fileName).imgUrl} alt="fileIcon" />
                <span>{item.fileName}</span>
            </div>
            <span>{commitsRequest && commitsRequest.length > 0 && commitsRequest[commitsRequest.length - 1].commitMessage}</span>
            <span>{calculateTimeDifference(item.creationFile, true, true, true, true, false)}</span>
        </div>
    )
}

export default FileContent