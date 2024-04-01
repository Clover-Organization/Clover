import Swal from 'sweetalert2';
import { toast } from 'sonner';

export const FetchUser = async (token, setUserData) => {
    try {
        const response = await fetch("http://localhost:8080/user/token", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData && responseData) {
                setUserData(responseData);
            } else {
                // Utilize SweetAlert para mensagens de erro ou console.warn
                toast.warning("Warning", {
                    description: `The response does not contain a valid username.`,
                });
            }
        } else {
            // Utilize SweetAlert para mensagens de erro ou console.error
            toast.error("Error", {
                description: `An unexpected error occurred while fetching user information: ${response.status}`,
            });
        }
    } catch (error) {
        // Utilize SweetAlert para mensagens de erro ou console.error
        toast.error("Error", {
            description: `Error fetching user information. Please try again later.`,
        });
        console.error("Erro ao buscar as informações do usuário:", error);
    }
};
