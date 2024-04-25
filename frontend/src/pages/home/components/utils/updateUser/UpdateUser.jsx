import { url } from '@/infra/url';
import { toast } from 'sonner';

export const updateUser = async (editUser, token, setUserData) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editUser),
        });

        if (response.ok) {
            const responseData = await response.json();

            setUserData(responseData);
            toast.success("Sucess", {
                description: responseData.message || 'Update carried out successfully!',
            });
        } else {
            toast.error("Error", {
                description: `Unexpected error. Please try again later.`,
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: `Error updating user information. Please try again later.`,
        });
    }
};
