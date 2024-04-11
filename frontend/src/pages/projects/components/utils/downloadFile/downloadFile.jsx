/**
 * Faz o download de um arquivo do servidor.
 * @param {string} token - Token de autenticação para a requisição.
 * @param {string} idFile - ID do arquivo a ser baixado.
 */
export const downloadFile = async (token, idFile) => {
    try {
        // Faz a requisição para baixar o arquivo
        const response = await fetch(`http://localhost:8080/projects/files/${idFile}/download`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            // Extrai os dados da resposta
            const file = await response.json();

            // Cria um Blob com o conteúdo do arquivo
            const blob = new Blob([file.fileContent], { type: 'text/plain' });

            // Cria um URL temporário para o Blob
            const url = window.URL.createObjectURL(blob);
            
            // Cria um link para iniciar o download
            const link = document.createElement('a');
            link.href = url;
            link.download = file.fileName; // Define o nome do arquivo para download
            
            // Dispara o clique no link para iniciar o download
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
