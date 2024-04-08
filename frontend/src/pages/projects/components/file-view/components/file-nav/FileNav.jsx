import React from "react";

import commitIcon from "../../../../assets/commitIcon.png";
import lixoIcon from "../../../../assets/lixoIcon.png";
import editIcon from "../../../../assets/fileEdit.png";
import GetLanguageInfos from "../../../utils/getLanguageInfo/GetLanguageInfos";
import fileIcon from "../../../../assets/fileIcon.png";
import { ListPlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileNav = ({
	singleRequest,
	setModalIsOpen,
	setModalDeleteIsOpen,
	handleGetAllCommitsAction,
	showCommit,
	setShowCommits,
	setCommitNull,
	handleShowFileEditor,
	isEditing,
	showFileEditor,
}) => {
	return (
		<>
			<div
				className="lupaSearch cursor-pointer"
				onClick={() => {
					setShowCommits(false), setCommitNull();
				}}
			>
				<img
					src={
						singleRequest &&
						singleRequest.fileName &&
						GetLanguageInfos(singleRequest.fileName)
							? GetLanguageInfos(singleRequest.fileName).imgUrl
							: fileIcon
					}
					width={"40px"}
				/>
				<h2>{singleRequest.fileName}</h2>
			</div>
			<div className="flex gap-4">
				<div className="flex justify-center items-center gap-4">
					<h4>
						{showCommit !== undefined && showCommit !== ""
							? showCommit
							: singleRequest.commits && singleRequest.commits.length > 0
								? singleRequest.commits[singleRequest.commits.length - 1]
										.commitMessage
								: null}
					</h4>

					<div
						className="getAllCommits"
						onClick={() => handleGetAllCommitsAction()}
					>
						<h4>
							Commits:{" "}
							{singleRequest && singleRequest.commits
								? singleRequest.commits.length
								: 0}
						</h4>
					</div>
					<Button onClick={() => setModalIsOpen(true)}>
						<ListPlus className="mr-2 h-4 w-4" /> New Commit
					</Button>
				</div>
				<div className="commitsProject-dsp-flex-align">
					{isEditing ? (
						<Button
							variant="outline"
							size="icon"
							onClick={handleShowFileEditor}
						>
							<Pencil className="h-4 w-4 text-primary" />
						</Button>
					) : (
						<Button
							variant="outline"
							size="icon"
							onClick={handleShowFileEditor}
						>
							<Pencil className="h-4 w-4" />
						</Button>
					)}
				</div>
				<div className="commitsProject-dsp-flex-align">
					<Button variant="outline" size="icon" onClick={setModalDeleteIsOpen}>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</>
	);
};

export default FileNav;
