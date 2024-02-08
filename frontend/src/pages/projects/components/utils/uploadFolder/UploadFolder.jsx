import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * Função para enviar uma pasta ao servidor.
 * @param {string} token - Token de autenticação.
 * @param {string} idProject - ID do projeto.
 * @param {Array} foldersFiles - Lista de arquivos a serem enviados.
 */

export const uploadFolder = async (token, idProject, foldersFiles, idFolder) => {

    // Variável para armazenar a resposta do servidor.
    var responseData = {};

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        // Cria um novo FormData para cada envio.
        const formData = new FormData();

        if (idFolder !== null) {
            formData.append('idFolder', idFolder)
        }

        // Agrupa os arquivos pelo path.
        const pathGroups = {};

        // Contador para armazenar quantos arquivos cada pasta possui.
        const folderFileCount = {};

        // Agrupa os arquivos pelo path.
        foldersFiles.forEach((file) => {
            const pathComponents = file.path.split('/').filter(component => component.trim() !== '');

            // Verifica se existem pelo menos dois componentes no caminho
            if (pathComponents.length >= 2) {
                // Substitui o valor 'path' pelo penúltimo componente
                const folderPath = pathComponents.slice(0, -1).join('/');
                if (!pathGroups[folderPath]) {
                    pathGroups[folderPath] = [];
                    folderFileCount[folderPath] = 0;
                }
                pathGroups[folderPath].push(file);
                folderFileCount[folderPath]++;
            } else {
                // Se não houver pelo menos dois componentes, mantém o objeto inalterado
                const folderPath = pathComponents[0] || '';
                if (!pathGroups[folderPath]) {
                    pathGroups[folderPath] = [];
                    folderFileCount[folderPath] = 0;
                }
                pathGroups[folderPath].push(file);
                folderFileCount[folderPath]++;
            }
        });

        // Adiciona um contador para cada subfolder
        const subfolderCount = {};

        for (const path in pathGroups) {
            const subfolders = path.split('/').filter(component => component.trim() !== '');

            for (let i = 1; i < subfolders.length; i++) {
                const subfolderPath = subfolders.slice(0, i).join('/');
                if (!subfolderCount[subfolderPath]) {
                    subfolderCount[subfolderPath] = 0;
                }
                subfolderCount[subfolderPath]++;
            }
        }

        // Ajuste para garantir que folders sem subfolders sejam contados como 0
        for (const path in pathGroups) {
            if (!subfolderCount[path]) {
                subfolderCount[path] = 0;
            }
        }

        // Agora, você pode acessar o número de subfolders para cada pasta usando subfolderCount.
        console.log(subfolderCount);



        // Percorre os grupos de arquivos agrupados pelo path.
        for (const path of Object.keys(pathGroups).sort()) {

            const filesInPath = pathGroups[path];

            // Verifica se há subfolders para o path atual
            const hasSubfolders = subfolderCount[path] > 0;

            console.log(hasSubfolders);

            // Adiciona os arquivos ao FormData, convertendo cada um no processo
            filesInPath.forEach((file) => {
                formData.append('files', file);
            });

            // Adiciona o nome do path ao FormData.
            formData.append('name', path);

            console.log("folder a ser salvo ", path);

            // Envia a requisição para o servidor.
            const response = await fetch(`http://localhost:8080/projects/folders/${idProject}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            // Limpa o FormData para a próxima iteração
            formData.delete('name');
            formData.delete('files');

            // Verifica se a resposta do servidor é bem-sucedida.
            if (response.ok) {
                try {
                    // Obtém os dados JSON retornados pelo backend.
                    if (hasSubfolders) {
                        responseData = await response.json();
                    }
                    console.log("responseData", responseData);
                }
                finally {
                    // Adiciona 'idFolder' ao FormData inicial, se desejado.
                    formData.delete('idFolder');
                    if (responseData.idFolder !== null) {
                        formData.append('idFolder', responseData.idFolder);
                        // responseData.idFolder = null;
                    }

                    // Exibe uma mensagem de sucesso para o usuário.
                    Swal.fire({
                        icon: 'success',
                        title: 'Arquivos enviados com sucesso!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                // Manipula os erros de resposta do servidor.
                handleErrorResponse(response);
            }
            await delay(500);
        }

    } catch (error) {
        // Manipula erros durante a requisição.
        console.log("Error fetching the request:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro na requisição',
            text: 'Ocorreu um erro ao enviar os arquivos. Por favor, tente novamente.',
        });
    }
};

/**
 * Função para tratar erros de resposta do servidor.
 * @param {Response} response - Objeto de resposta da requisição.
 */
const handleErrorResponse = (response) => {
    if (response.status === 404) {
        console.log("Request not found");
        Swal.fire({
            icon: 'error',
            title: 'Erro 404',
            text: 'Requisição não encontrada.',
        });
    } else {
        console.log("An unexpected error occurred:", response.status);
        Swal.fire({
            icon: 'error',
            title: 'Erro inesperado',
            text: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        });
    }
};