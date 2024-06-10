import { url } from "@/infra/url";

export const getIssueById = async (token, id, setIssue, setLoading) => {
    setLoading(true);
    try {
        const response = await fetch(`${url}/issue/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setIssue(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}