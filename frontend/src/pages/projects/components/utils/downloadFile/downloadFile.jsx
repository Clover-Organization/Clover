export const downloadFile = async (token, idFile, idProject, singleRequest) => {
    try {
        // Faz a requisição para baixar o arquivo
        const response = await fetch(`http://localhost:8080/projects/files/${idProject}/${idFile}/content`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            // Extrai os dados da resposta
            const file = await response.blob();

            // Cria um URL temporário para o Blob
            const url = window.URL.createObjectURL(file);
            
            // Cria um link para iniciar o download
            const link = document.createElement('a');
            link.href = url;
            link.download = singleRequest.fileName; // Defina um nome de arquivo apropriado aqui
            
            // // Dispara o clique no link para iniciar o download
            link.click();
            
            // Libera o URL temporário
            window.URL.revokeObjectURL(url);
        } else if (response.status === 404) {
            console.log("File not found");
            // Trata o caso em que o arquivo não foi encontrado no servidor
        } else {
            console.log("An unexpected error occurred:", response.status);
            // Trata outros códigos de status conforme necessário
        }
    } catch (error) {
        console.log("Error fetching the file:", error);
        // Trata erros de requisição aqui
    }
}
