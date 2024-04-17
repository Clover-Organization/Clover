import { toast } from "sonner";

export const tokenMail = async (email, token) => {
    try {
        const response = await fetch("http://localhost:8080/update-password/generate-token", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(email),
        });

        if (response.ok) {
            toast.success("Success!", {
                description: "Token sent. Check your email.",
            });
        } else {
            const errorMessage = await response.text();
            toast.error("Error", {
                description: `Error generating token: ${errorMessage}`,
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: `Error generating token. Try again later.`,
        });
    }
};
