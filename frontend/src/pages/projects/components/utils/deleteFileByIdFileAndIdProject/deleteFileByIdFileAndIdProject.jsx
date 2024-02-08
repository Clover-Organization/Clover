import Swal from "sweetalert2";

export const deleteFileByIdFileAndIdProject = async (token, idFile, idProject, idFolder) => {
    try {

        const formData = new FormData();
        if (idFolder != null) {
            formData.append("idFolder", idFolder);
        }

        const response = await fetch(`http://localhost:8080/projects/files/${idProject}/delete/${idFile}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        if (response.ok) {

            Swal.fire({
                icon: 'success',
                title: 'Arquivo deletado com sucesso!',
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
            text: 'Ocorreu um erro em deletar o arquivo. Por favor, tente novamente.',
        });
    }
}