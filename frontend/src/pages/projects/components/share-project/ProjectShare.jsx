import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


const ProjectShare = () => {

    const bearToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const { token } = useParams();
    console.log(token);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch(`http://localhost:8080/projects/confirm-token/share/${token}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${bearToken}`,
                    },
                });

                if (response.status >= 200 && response.status < 300) {
                    toast.success("Sucess!", {
                        description: "Successfully shared project!",
                    });
                    navigate("/");
                } else {
                    const errorResponse = await response.json();
                    toast.error("Error", {
                        description: errorResponse.error,
                    });
                    navigate("/");
                }
            } catch (error) {
                console.log("Error fetching the request:", error);
                // Trate erros de requisição aqui
                navigate("/");
            }
        }
        validateToken();
    }, [token]);

    return (
        <h1>Confirmou!</h1>
    )
}
export default ProjectShare;