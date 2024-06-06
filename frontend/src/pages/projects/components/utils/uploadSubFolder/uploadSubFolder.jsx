import { url } from '@/infra/url';
import { toast } from 'sonner';

export const uploadSubFolder = async (token, idProject, acceptedFiles, nameFolder, idFolder) => {
    try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('name', nameFolder);


        const response = await fetch(`${url}/projects/folders/${idProject}/folders/${idFolder}/subfolders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            toast.success("Sucess", {
                description: `Files uploaded successfully!`,
            });

        } else if (response.status === 404) {
            toast.error("Error", {
                description: `Request not found.`,
            });
        } else {
            toast.error("Error", {
                description: `An unexpected error occurred: ${response.status}`,
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: `Error fetching the request: ${error.message}`,
        });
    }
};
