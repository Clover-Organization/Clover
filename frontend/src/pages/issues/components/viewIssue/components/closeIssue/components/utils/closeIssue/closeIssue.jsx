import { url } from "@/infra/url";
import { toast } from "sonner";

export const closeIssue = async (token, id) => {
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