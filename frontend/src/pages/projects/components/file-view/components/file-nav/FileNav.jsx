import React from "react";

import commitIcon from '../../../../assets/commitIcon.png'
import lixoIcon from '../../../../assets/lixoIcon.png';
import editIcon from '../../../../assets/fileEdit.png';
import GetLanguageInfos from "../../../utils/getLanguageInfo/GetLanguageInfos";
import fileIcon from '../../../../assets/fileIcon.png';

const FileNav = ({ singleRequest, setModalIsOpen, setModalDeleteIsOpen, handleGetAllCommitsAction, showCommit, setShowCommits, setCommitNull, handleShowFileEditor, showFileEditor }) => {

    return (
        <>
            <div className="lupaSearch">
                <img src={singleRequest && singleRequest.fileName && GetLanguageInfos(singleRequest.fileName) ? GetLanguageInfos(singleRequest.fileName).imgUrl : fileIcon} width={"40px"} />
                <h2 style={{ cursor: "pointer" }} onClick={() => { setShowCommits(false), setCommitNull(); }}>
                    {singleRequest.fileName}
                </h2>
            </div>
            <div className="align-nav-components-files">
                <div className="commitsProject-dsp-flex-align">
                    {!showFileEditor && (
                        <img src={commitIcon} alt="Commits" onClick={() => setModalIsOpen(true)} />
                    )}
                    <h4>
                        {showCommit !== undefined && showCommit !== "" ? (
                            showCommit
                        ) : (
                            singleRequest.commits && singleRequest.commits.length > 0 ? (
                                singleRequest.commits[singleRequest.commits.length - 1].commitMessage
                            ) : (
                                null
                            )
                        )}
                    </h4>

                    <div className="getAllCommits" onClick={() => handleGetAllCommitsAction()}>
                        <h4>Commits: {singleRequest && singleRequest.commits ? singleRequest.commits.length : 0}</h4>
                    </div>
                </div>
                <div className="commitsProject-dsp-flex-align">
                    <img src={editIcon} alt="EditIcon" width={24} onClick={handleShowFileEditor} />
                </div>
                <div className="commitsProject-dsp-flex-align">
                    <img src={lixoIcon} alt="DeleteIcon" width={24} onClick={setModalDeleteIsOpen} />
                </div>
            </div>
        </>
    )
}

export default FileNav;