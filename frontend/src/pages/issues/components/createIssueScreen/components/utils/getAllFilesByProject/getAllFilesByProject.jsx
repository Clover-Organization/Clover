import { url } from "@/infra/url";

export const getAllFilesByProject = async (token, idProject, setFiles) => {
    const response = await fetch(`${url}/projects/files/all/project/${idProject}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        setFiles(data);
    }
}