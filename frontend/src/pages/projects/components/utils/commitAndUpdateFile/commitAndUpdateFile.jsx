import { toast } from 'sonner';

export const commitAndUpdateFile = async (token, idProject, idFile, newCommitAndFile) => {
    try {
        const formData = new FormData();
        formData.append('file', newCommitAndFile.newFile);
        formData.append('commitMessage', newCommitAndFile.newCommit);

        const response = await fetch(`http://localhost:8080/projects/commits/${idProject}/commitAndUpdate/${idFile}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            toast.success("Sucess!", {
                description: "File Committed Successfully!",
            });
        } else {
            toast.error("Error!", {
                description: `HTTP Status: ${response.status}`,
            });

            console.error('Error committing file:', response.status);
            // Trate o erro conforme necessário
        }
    } catch (error) {
        toast.error("Error!", {
            description: `Error Details: ${error.message}`,
        });

        console.error('Error committing file:', error);
    }
};
