import Swal from "sweetalert2";
import { toast } from "sonner";

export const tokenMailForgotPassword = async (emailEdit) => {
	try {
		const response = await fetch(
			"http://localhost:8080/update-password/generate-token/forgot-password",
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
			console.log("Error generating token:", data);
			toast.warning(`${data["email"]} not Found`, { description: data["msg"] });
			return response;
		}
	} catch (error) {
		console.log("Erro ao gerar o token:", error);
		toast.error("Error", {
			description: "Error generating token. Try again later.",
		});
	}
};
