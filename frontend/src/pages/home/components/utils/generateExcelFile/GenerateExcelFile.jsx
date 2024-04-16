import { toast } from "sonner";

export const GenerateExcelFile = async ({ allUsers, token, setFileUrl }) => {
    try {

        const url = allUsers ? 'http://localhost:8080/file/download/all' : 'http://localhost:8080/file/download';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            setFileUrl(url);
        } else {
            toast.error("Error", {
                description: "Error. Failed to fetch data from API.",
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: `Error. ${error}`,
        });
    }
};