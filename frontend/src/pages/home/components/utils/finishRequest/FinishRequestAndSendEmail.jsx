import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const FinishRequestAndSendEmail = async (token, email, problem, username, id) => {
    try {
        const data = {
            email: email,
            problem: problem,
            username: username,
            id: id
        };

        const response = await fetch("http://localhost:8080/request/finish-request", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            Swal.fire({
                text: 'Finished!',
                icon: 'success',
            });
        } else {
            console.log("Ocorreu um erro ao gerar o token:", response.status);
            const errorMessage = await response.text();
            Swal.fire({
                text: `Erro ao gerar o token: ${errorMessage}`,
                icon: 'error',
                customClass: {
                    popup: 'custom-popup-class',
                },
            });
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
