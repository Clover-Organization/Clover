import { url } from "@/infra/url";

export const getFileContent = async (token, idProject, idFile, setFilesRequest) => {
    try {
        const response = await fetch(`${url}/projects/files/${idProject}/${idFile}/content`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.startsWith("image/")) {
                // Se o conteúdo for uma imagem, configure o estado para exibir a imagem
                const blob = await response.blob();
                setFilesRequest({ contentType: "image", data: URL.createObjectURL(blob) });
            } else {
                // Se não for uma imagem, trata como texto ou outro tipo de conteúdo
                const responseData = await response.text();
                setFilesRequest({ contentType: "text", data: responseData });
            }
        } else if (response.status === 404) {
            console.log("Request not found");
            // Trate o caso em que a requisição não foi encontrada
        } else {
            console.log("An unexpected error occurred:", response.status);
            // Trate outros códigos de status conforme necessário
        }
    } catch (error) {
        console.log("Error fetching or processing the request:", error);
        // Trate erros de requisição aqui
    }
};
