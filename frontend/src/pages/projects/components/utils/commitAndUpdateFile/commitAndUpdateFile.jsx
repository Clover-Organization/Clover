import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const commitAndUpdateFile = async (token, idProject, idFile, newCommitAndFile) => {
    try {
        const formData = new FormData();
        formData.append('file', newCommitAndFile.newFile);
        formData.append('commitMessage', newCommitAndFile.newCommit);

        console.log(idFile);
        console.log(idProject);

        const response = await fetch(`http://localhost:8080/projects/commits/${idProject}/commitAndUpdate/${idFile}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            // Use SweetAlert2 para exibir uma mensagem de sucesso
            Swal.fire({
                icon: 'success',
                title: 'File Committed Successfully!',
                showConfirmButton: false,
                timer: 1500, // Tempo em milissegundos
            });

            // Você pode retornar dados adicionais ou tratar de acordo com a necessidade
        } else {
            // Use SweetAlert2 para exibir uma mensagem de erro
            Swal.fire({
                icon: 'error',
                title: 'Error Committing File',
                text: `HTTP Status: ${response.status}`,
            });

            console.error('Error committing file:', response.status);
            // Trate o erro conforme necessário
        }
    } catch (error) {
        // Use SweetAlert2 para exibir uma mensagem de erro
        Swal.fire({
            icon: 'error',
            title: 'Error Committing File',
            text: `Error Details: ${error.message}`,
        });

        console.error('Error committing file:', error);
        // Trate o erro conforme necessário
    }
};
