export const tokenCheckAndUpdatePassword = async (tokenMailLabel) => {
	try {
		const response = await fetch(
			"http://localhost:8080/update-password/confirm-reset",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(tokenMailLabel),
			}
		);

		const data = await response.json();

		if (response.ok) {
			toast.success(data["msg"], {
				description: `Sucessfully changed password on ${data["get"]}`,
			});
			return response;
		} else if (response.status === 404) {
			toast.warning(data["msg"], { description: `${data["get"]} not Found` });
			return response;
		} else if (response.status === 400) {
			toast.warning("Error", data["msg"]);
			return response;
		} else {
			console.log("Error generating token:", data);
			return response;
		}
	} catch (error) {
		console.log("Erro ao gerar o token:", error);
	}
};
