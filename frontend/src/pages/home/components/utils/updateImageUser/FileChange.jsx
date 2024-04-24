import { toast } from 'sonner';

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
                    toast.success("Sucess", {
                        description: `User image updated successfully!`,
                    });
                } else {
                    toast.error("Error", {
                        description: `Error updating user image: ${response.status}`,
                    });
                }
            } catch (error) {
                toast.error("Error", {
                    description: `Error processing image: ${error.message}`,
                });
            }
        }
    }
};
