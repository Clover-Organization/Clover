import { url } from "@/infra/url";
import { toast } from "sonner";

export const tokenMailForgotPassword = async (emailEdit) => {
	try {
		const response = await fetch(
			`${url}/update-password/generate-token/forgot-password`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ emailEdit }),
			}
		);

		const data = await response.json();

		if (response.ok) {
			toast.success(data["msg"], {
				description: `Token sent to ${data["email"]}`,
			});
			return response;
		} else {
			console.error("Error generating token:", data);
			toast.warning(`${data["email"]} not Found`, { description: data["msg"] });
			return response;
		}
	} catch (error) {
		console.error("Erro ao gerar o token:", error);
		toast.error("Error", {
			description: "Error generating token. Try again later.",
		});
	}
};
