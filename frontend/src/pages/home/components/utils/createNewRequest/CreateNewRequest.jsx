import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Function to create a new request
export const CreateNewRequest = async (formData, token) => {
    const data = {
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
    };

    try {
        const response = await fetch("http://localhost:8080/projects/upload", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            Swal.fire({
                text: 'Successful registration!',
                icon: 'success',
                customClass: {
                    popup: 'custom-popup-class',
                },
                didOpen: () => {
                    const modal = Swal.getPopup();
                    modal.style.zIndex = 99999;
                    // Adicione outras personalizações de estilo conforme necessário
                },
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
        Swal.fire({
            text: 'Error sending the request. Please try again later.',
            icon: 'error',
            customClass: {
                popup: 'custom-popup-class',
            },
        });
    }
};
