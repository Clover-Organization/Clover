import { url } from "@/infra/url";

export const getAllIssuesByProject = async (token, setIssues, idProject, setLoading, page, filterBy, setTotalPages) => {
    try {
        setLoading(true);
        const response = await fetch(`${url}/issue/all/${idProject}?page=${page}&sort=${filterBy}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setTotalPages(data.totalPages);
        setIssues(data.content);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}