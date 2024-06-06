import { url } from '@/infra/url';
import { toast } from 'sonner';

export const uploadFilesIntoFolder = async (token, idProject, acceptedFiles, idFolder) => {
    try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });


        const response = await fetch(`${url}/projects/folders/${idProject}/${idFolder}/newFile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            toast.success("Sucess!", {
                description: "Files sent successfully!",
            });

        } else if (response.status === 404) {
            console.log("Request not found");
            toast.error("Error!", {
                description: "Request not found.",
            });
        } else {
            console.log("An unexpected error occurred:", response.status);
            toast.error("Error!", {
                description: "An unexpected error has occurred. Please try again.",
            });
        }
    } catch (error) {
        console.log("Error fetching the request:", error);
        toast.error("Error!", {
            description: "An error occurred while uploading the files. Please try again.",
        });
    }
};
