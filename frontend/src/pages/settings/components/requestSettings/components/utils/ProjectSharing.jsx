import { url } from "@/infra/url";
import { toast } from "sonner";

export const ProjectSharing = async (token, dataShareProject) => {
    try {
        const response = await fetch(`${url}/projects/share`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(dataShareProject),
        });

        if (response.ok) {
            toast.success("Sucess!", {
                description: "Successfully shared project!",
            });
        } else {
            const errorResponse = await response.json();
            toast.error("Error", {
                description: errorResponse.message,
            });

        }
    } catch (error) {
        console.log("Error fetching the request:", error);
        toast.error("Error", {
            description: error,
        });
    }
}