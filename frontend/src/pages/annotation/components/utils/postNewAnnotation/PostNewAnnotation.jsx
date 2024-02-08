import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const postNewAnnotation = async (token, title, idProject) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/annotations/${idProject}/upload`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify({ title }), // Envie os dados no formato JSON
        });

        if (response.ok) {
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
        } else {
            console.log(`An unexpected error occurred: ${response.status}`);
            // Lida com outros códigos de status, se necessário
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
