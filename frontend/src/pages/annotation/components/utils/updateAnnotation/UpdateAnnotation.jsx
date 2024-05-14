import { url } from '@/infra/url';
import { toast } from 'sonner';

// Function to update a request
export const updateAnnotation = async (token, editedRequest, idAnnotation, idProject, setSelectedAnnotation) => {
    try {
        const response = await fetch(`${url}/projects/annotations/${idProject}/annotation/${idAnnotation}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editedRequest),
        });
        if (response.ok) {
            // Successful update
            toast.success("Sucess!", {
                description: "Annotation updated successfully!",
            });
            response.json().then((data) => {
                setSelectedAnnotation(data);
            });
        } else {
            // Handle response errors
            toast.error("Error", {
                description: `Error updating request: ${response.status}`,
            });
            console.error('Error updating request:', response.status);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error making update request:', error);
        toast.error("Error", {
            description: "Error making update request. Please try again later.",
        });
    }
};
