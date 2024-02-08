import Swal from 'sweetalert2';

export const FetchUser = async (token, setUserData) => {
    try {
        const response = await fetch("http://localhost:8080/user/token", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();

            if (responseData && responseData) {
                setUserData(responseData);
            } else {
                // Utilize SweetAlert para mensagens de erro ou console.warn
                Swal.fire({
                    icon: 'warning',
                    title: 'Aviso',
                    text: 'A resposta não contém um nome de usuário válido.',
                });
            }
        } else {
            // Utilize SweetAlert para mensagens de erro ou console.error
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Ocorreu um erro inesperado ao buscar as informações do usuário: ${response.status}`,
            });
        }
    } catch (error) {
        // Utilize SweetAlert para mensagens de erro ou console.error
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao buscar as informações do usuário. Por favor, tente novamente mais tarde.',
        });
        console.error("Erro ao buscar as informações do usuário:", error);
    }
};
