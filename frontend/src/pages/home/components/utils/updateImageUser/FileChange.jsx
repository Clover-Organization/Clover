import Swal from 'sweetalert2';

export const FileChange = async (e, token) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('http://localhost:8080/updateUserImage', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    // Exibir alerta de sucesso
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Imagem do usuário atualizada com sucesso!',
                    });
                } else {
                    // Exibir alerta de erro
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: `Erro ao atualizar imagem do usuário: ${response.status}`,
                    });
                }
            } catch (error) {
                // Exibir alerta de erro
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro ao processar a imagem: ${error.message}`,
                });
            }
        }
    }
};
