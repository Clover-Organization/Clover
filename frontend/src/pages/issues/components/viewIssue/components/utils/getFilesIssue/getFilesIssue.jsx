import { url } from "@/infra/url";

export const getFilesIssue = async (token, issueData, setFilesRequest) => {
    try {
        const response = await fetch(`${url}/issue/files`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(issueData.files)
            ,
        });

        if (response.ok) {
            const responseData = await response.json();
            setFilesRequest(responseData);
        } else if (response.status === 404) {
            console.log("Request not found");
            // Trate o caso em que a requisição não foi encontrada
        } else {
            console.log("An unexpected error occurred:", response.status);
            // Trate outros códigos de status conforme necessário
        }
    } catch (error) {
        console.log("Error fetching or processing the request:", error);
        // Trate erros de requisição aqui
    }
}