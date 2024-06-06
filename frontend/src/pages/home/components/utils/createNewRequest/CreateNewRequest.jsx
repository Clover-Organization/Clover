import { url } from '@/infra/url';
import { toast } from 'sonner';

// Function to create a new request
export const CreateNewRequest = async (formData, token) => {
    const isValid = validateForm(formData);
    if (!isValid) return;

    const data = {
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
    };

    try {
        const response = await fetch(`${url}/projects/upload`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            toast.success("Sucess!", {
                description: `Success in creating the project ${data.projectName}!`,
            });
        } else if (response.status === 400) {
            const errorData = await response.json();
            const errorArray = [];

            for (const fieldName in errorData) {
                const errorMessage = errorData[fieldName];
                errorArray.push({ fieldName, errorMessage });
            }

            // Aqui, você pode lidar com os erros da validação, se necessário
        } else {
            console.log("An unexpected error occurred: " + response.status);
        }
    } catch (error) {
        console.log("Error sending the request:", error);
        toast.error("Error", {
            description: "Error sending the request. Please try again later.",
        });
    }
};

const validateForm = (formData) => {
    let isValid = true;
    
    if (!formData.projectName) {
        isValid = false;
        toast.error("Error", {
            description: "Project name is required.",
        });
    }

    return isValid;
}