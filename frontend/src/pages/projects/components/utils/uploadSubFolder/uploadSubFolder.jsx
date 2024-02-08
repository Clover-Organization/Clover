import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const uploadSubFolder = async (token, idProject, acceptedFiles, nameFolder, idFolder) => {
    try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('name', nameFolder);


        const response = await fetch(`http://localhost:8080/projects/folders/${idProject}/folders/${idFolder}/subfolders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {

            Swal.fire({
                icon: 'success',
                title: 'Arquivos enviados com sucesso!',
                showConfirmButton: false,
                timer: 1500,
            });

        } else if (response.status === 404) {
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
    } catch (error) {
        console.log("Error fetching the request:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro na requisição',
            text: 'Ocorreu um erro ao enviar os arquivos. Por favor, tente novamente.',
        });
    }
};
