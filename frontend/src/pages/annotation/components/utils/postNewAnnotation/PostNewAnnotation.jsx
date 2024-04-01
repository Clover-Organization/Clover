import { toast } from 'sonner';

export const postNewAnnotation = async (token, title, idProject, setSelectedAnnotation) => {
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
            const annotationResponse = await response.json();
            toast.success("Sucess!", {
                description: "Successful creation of new annotation.",
            });
            console.log(annotationResponse);
            setSelectedAnnotation(annotationResponse)
        } else {
            console.log(`An unexpected error occurred: ${response.status}`);
            // Lida com outros códigos de status, se necessário
        }
    } catch (error) {
        console.log("Error sending the request:", error);
        toast.error("Error", {
            description: "Error sending the request. Please try again later.",
        });
    }
};
