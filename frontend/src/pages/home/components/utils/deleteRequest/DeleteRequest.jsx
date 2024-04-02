import { toast } from 'sonner';

// Function to delete a request
export const deleteRequest = async (token, editedRequest) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/${editedRequest.idProject}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            toast.success("Sucess!", {
                description: "Request deleted successfully!",
            });
        } else {
            console.error('Error deleting the request:', response.status);
        }
    } catch (error) {
        console.error('Error making delete request:', error);
        toast.error("Error!", {
            description: "Error making delete request. Please try again later.",
        });
    }
};
