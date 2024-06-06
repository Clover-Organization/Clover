import { url } from "@/infra/url";
import { toast } from "sonner";

export const removeNotification = async (token, idNotification) => {
    const response = await fetch(`${url}/notification/delete/${idNotification}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then((res) => {
            if (res.ok) {
                toast.success("Sucess!", {
                    description: "Notification removed successfully!",
                });
            } else {
                toast.error("Error", {
                    description: "Error removing notification. Please try again later.",
                });
            }

        })
        .catch((err) => console.log(err));
}