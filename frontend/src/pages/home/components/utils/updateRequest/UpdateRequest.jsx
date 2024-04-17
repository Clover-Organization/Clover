import { toast } from 'sonner';

export const updateRequest = async (token, editedRequest, setSingleRequest) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/${editedRequest.idProject}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editedRequest),
        });
        if (response.ok) {
            toast.success("Sucess", {
                description: `Request updated successfully!`,
            });

            setSingleRequest({ ...editedRequest });
        } else {
            toast.error("Error", {
                description: `Error updating request: ${response.status}`,
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: `Error making update request. Please try again later.`,
        });
    }
};
