import { url } from "@/infra/url";
import { toast } from "sonner";

export const closeIssue = async (token, id, idProject) => {
    try {
        const response = await fetch(`${url}/issue/close/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            toast.success("success", {
                "description": "Issue closed successfully"
            });
            window.location.href = `/issues/${idProject}`;
        } else {
            toast.error("error", {
                "description": "Error closing issue"
            });
            console.log(data);
        }
    } catch (e) {
        console.log(e);
    }
}