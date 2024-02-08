import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const tokenMail = async (email, token) => {
    try {
        const response = await fetch("http://localhost:8080/update-password/generate-token", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(email),
        });

        if (response.ok) {
            Swal.fire({
                text: 'Token sent. Check your email.',
                icon: 'success',
            });
        } else {
            console.log("Ocorreu um erro ao gerar o token:", response.status);
            const errorMessage = await response.text();
            Swal.fire({
                text: `Erro ao gerar o token: ${errorMessage}`,
                icon: 'error',
            });
        }
    } catch (error) {
        console.log("Erro ao gerar o token:", error);
        Swal.fire({
            text: 'Erro ao gerar o token. Por favor, tente novamente mais tarde.',
            icon: 'error',
        });
    }
};
