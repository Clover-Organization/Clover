import { url } from "@/infra/url";
import { toast } from "sonner";

export const FinishRequestAndSendEmail = async (token, email, problem, username, id) => {
    try {
        const data = {
            email: email,
            problem: problem,
            username: username,
            id: id
        };

        const response = await fetch(`${url}/request/finish-request`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success("Success!", {
                description: "Finished.",
            });
        } else {
            toast.error("Error", {
                description: "Error generating token. Try again later.",
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: "Error generating token. Try again later.",
        });
    }
}
