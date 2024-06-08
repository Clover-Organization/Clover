import { url } from "@/infra/url";
import { toast } from "sonner";

export const createIssue = async (token, idProject, issue, setLoading, setIssues) => {
    setLoading(true);
    try {

        const response = await fetch(`${url}/issue/create/project/${idProject}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(issue)
        });
        const data = await response.json();
        if (response.ok) {
            toast.success("success", {
                "description": "Issue created successfully"
            });
            console.log(data);
            setIssues({
                title: "",
                description: ""
            });
        } else {
            toast.error("error", {
                "description": "Error creating issue"
            });
            console.log(data);

        }
    } catch (e) {
        console.log(e);
    } finally {
        setLoading(false);
    }
}