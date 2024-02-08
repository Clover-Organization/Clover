import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Function to update a request
export const updateAnnotation = async (token, editedRequest, idAnnotation, idProject) => {
    console.log(JSON.stringify(editedRequest));
    try {
        const response = await fetch(`http://localhost:8080/projects/annotations/${idProject}/annotation/${idAnnotation}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editedRequest),
        });
        if (response.ok) {
            // Successful update
            Swal.fire({
                text: 'Request updated successfully!',
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
        } else {
            // Handle response errors
            Swal.fire({
                text: `Error updating request: ${response.status}`,
                icon: 'error',
                customClass: {
                    popup: 'custom-popup-class',
                },
            });
            console.error('Error updating request:', response.status);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error making update request:', error);
        Swal.fire({
            text: 'Error making update request. Please try again later.',
            icon: 'error',
            customClass: {
                popup: 'custom-popup-class',
            },
        });
    }
};
