import React from "react";

import commitIcon from "../../../../assets/commitIcon.png";
import lixoIcon from "../../../../assets/lixoIcon.png";
import editIcon from "../../../../assets/fileEdit.png";
import GetLanguageInfos from "../../../utils/getLanguageInfo/GetLanguageInfos";
import fileIcon from "../../../../assets/fileIcon.png";
import { ListPlus, Pencil, Trash2, ListCollapse, List, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

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
	handleDownloadFile,
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
				<div className="flex justify-center items-center gap-2">

					<Button onClick={() => setModalIsOpen(true)}>
						<ListPlus className="mr-2 h-4 w-4" /> New Commit
					</Button>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="getAllCommits"
									onClick={handleGetAllCommitsAction}
									variant="outline"
								>
									<ListCollapse className="mr-2 h-4 w-4" />
									<h4>
										Commits:{" "}
										{singleRequest && singleRequest.commits
											? singleRequest.commits.length
											: 0}
									</h4>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								{singleRequest.commits && singleRequest.commits.length > 0 && (
									<p>{singleRequest.commits[singleRequest.commits.length - 1].commitMessage}</p>
								)}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				{!showFileEditor && (


					<div className="commitsProject-dsp-flex-align">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={handleDownloadFile}
									>
										<Download className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Download File</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
				<div className="commitsProject-dsp-flex-align">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									onClick={handleShowFileEditor}
								>
									{isEditing ? (
										<Pencil className="h-4 w-4 text-primary" />
									) : (
										<Pencil className="h-4 w-4" />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit File</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="commitsProject-dsp-flex-align">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									onClick={setModalDeleteIsOpen}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete File</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</>
	);
};

export default FileNav;
