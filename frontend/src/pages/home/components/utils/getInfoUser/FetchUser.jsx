import { url } from '@/infra/url';
import { toast } from 'sonner';

export const FetchUser = async (token, setUserData) => {
    try {
        const response = await fetch(`${url}/user/token`, {
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
                toast.warning("Warning", {
                    description: `The response does not contain a valid username.`,
                });
            }
        } else {
            toast.error("Error", {
                description: `An unexpected error occurred while fetching user information: ${response.status}`,
            });
        }
    } catch (error) {
        toast.error("Error", {
            description: `Error fetching user information. Please try again later.`,
        });
    }
};
