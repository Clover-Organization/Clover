import { toast } from "sonner";

export const deleteFileByIdFileAndIdProject = async (
	token,
	idFile,
	idProject,
	idFolder
) => {
	try {
		const formData = new FormData();
		if (idFolder != null) {
			formData.append("idFolder", idFolder);
		}

		const response = await fetch(
			`http://localhost:8080/projects/files/${idProject}/delete/${idFile}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			}
		);

		if (response.ok) {
			toast.success("Sucess", {
				description: `File deleted successfully!`,
			});
		} else if (response.status === 404) {
			toast.error("Error 404", {
				description: `Request not found.`,
			});
		} else {
			toast.error("Error", {
				description: `An unexpected error occurred: ${response.status}`,
			});
		}
	} catch (error) {
		toast.error("Error", {
			description: `Error fetching the request: ${error.message}`,
		});
	}
};
