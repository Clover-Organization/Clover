import { toast } from 'sonner';
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
                    toast.success("Sucess", {
                        description: `User image updated successfully!`,
                    });
                } else {
                    // Exibir alerta de erro
                    toast.error("Error", {
                        description: `Error updating user image: ${response.status}`,
                    });
                }
            } catch (error) {
                // Exibir alerta de erro
                toast.error("Error", {
                    description: `Error processing image: ${error.message}`,
                });
            }
        }
    }
};
