import { url } from "@/infra/url";
import { toast } from "sonner";

export const updateIssue = async (token, id, data, setLoading, setIssue) => {
    setLoading(true);
    try {
        const response = await fetch(`${url}/issue/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if (response.ok) {
            toast.success("success", {
                "description": "Issue updated successfully"
            });
            setIssue(res);
        } else if (response.status === 400) {
            toast.error("error", {
                "description": res.msg
            });

        }
        else {
            toast.error("error", {
                "description": "Error updating issue"
            });
        }
    } catch (e) {
        console.log(e);
    } finally {
        setLoading(false);
    }
}