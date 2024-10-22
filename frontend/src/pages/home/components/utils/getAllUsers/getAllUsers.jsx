import { url } from "@/infra/url";
import { toast } from "sonner";

export const getAllUsers = async (token, setUserData, page) => {
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const userData = await response.json(); // Extrair os dados da resposta
            setUserData(userData.content); // Atualizar o estado com os dados obtidos
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