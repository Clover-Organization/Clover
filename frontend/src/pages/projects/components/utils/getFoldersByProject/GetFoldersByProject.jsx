export const getFoldersByProject = async (token, idProject, setFilesRequest) => {

    try {
        const response = await fetch(`http://localhost:8080/projects/${idProject}/folder`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData && typeof responseData === 'object') {
                // Atualize o estado com os dados da resposta
                setFilesRequest(responseData);

            } else {
                console.error("Response does not contain a valid object:", responseData);
            }
        } else if (response.status === 404) {
            console.log("Request not found");
            // Trate o caso em que a requisição não foi encontrada
        } else {
            console.log("An unexpected error occurred:", response.status);
            // Trate outros códigos de status conforme necessário
        }
    } catch (error) {
        console.log("Error fetching the request:", error);
        // Trate erros de requisição aqui
    }
};
