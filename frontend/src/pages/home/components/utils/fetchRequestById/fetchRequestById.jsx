import { url } from "@/infra/url";


// Function to fetch a request by ID
export const fetchRequestById = async (token, idProject, setSingleRequest) => {
    if (!idProject) {
        return;
    }

    try {
        const response = await fetch(`${url}/projects/${idProject}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData && typeof responseData === 'object') {

                // Extract user data and add it to the single request
                const user = responseData.user;
                const updatedSingleRequest = {
                    ...responseData,
                    user: user,
                };

                setSingleRequest(updatedSingleRequest);
            } else {
                console.error("Response does not contain a valid object:", responseData);
            }
        } else if (response.status === 404) {
            console.log("Request not found");
            // Handle the case where the request was not found
        } else if (response.status === 401) {
            console.log("Unauthorized!");
            window.location.href = 'http://localhost:5173';

            // Handle the case where the request was not found
        } else {
            console.log("An unexpected error occurred: " + response.status);
        }
    } catch (error) {
        console.log("Error fetching the request:", error);
    }
};