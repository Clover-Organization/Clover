import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const tokenCheckAndUpdatePassword = async (tokenMailLabel, token, setModalLabelAndPassword, setUpdateModal) => {
    console.log(tokenMailLabel)
    try {
        const response = await fetch("http://localhost:8080/update-password/confirm-reset", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tokenMailLabel),
        });

        if (response.ok) {
            Swal.fire({
                text: 'Password updated successfully!',
                icon: 'success',
            });
        } else {
            console.log("Ocorreu um erro ao gerar o token:", response.status);
            const errorMessage = await response.text(); // Obtém o corpo da resposta em caso de erro
            Swal.fire({
                text: `Erro ao gerar o token: ${errorMessage}`,
                icon: 'error',
                customClass: {
                    popup: 'custom-popup-class',
                },
            });
            setModalLabelAndPassword(false);
            setUpdateModal(true);
        }
    } catch (error) {
        console.log("Erro ao gerar o token:", error);
        Swal.fire({
            text: 'Erro ao gerar o token. Por favor, tente novamente mais tarde.',
            icon: 'error',
            customClass: {
                popup: 'custom-popup-class',
            },
        });
    }
}
