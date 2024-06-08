import { url } from "@/infra/url";

export const getAllIssuesByProject = async (token, setIssues, idProject, setLoading) => {
    try {
        setLoading(true);
        const response = await fetch(`${url}/issue/all/${idProject}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setIssues(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}