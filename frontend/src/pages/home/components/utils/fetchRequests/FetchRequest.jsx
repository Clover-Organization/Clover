// Function to fetch requests from the server
export const fetchRequests = async (currentPage, setLoading, token, setToolBoxes, getStatusClass, setRequestsLoaded) => {
    const size = 15;
    try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/projects/user?page=${currentPage}&size=${size}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();

            if (Array.isArray(responseData)) {
                // Atualiza as solicitações e atribui a cor a cada uma
                setToolBoxes(responseData.map(request => ({
                    ...request,
                    colorClass: getStatusClass(request.status),
                })));
                setRequestsLoaded(true);
            } else {
                console.error("A resposta não contém uma matriz válida:", responseData);
            }
        } else {
            console.log("Ocorreu um erro inesperado ao buscar as solicitações: " + response.status);
        }
    } catch (error) {
        console.log("Erro ao buscar as solicitações:", error);
        // alert("Erro ao buscar as solicitações. Por favor, tente novamente mais tarde.");
    } finally {
        setLoading(false);
    }
};