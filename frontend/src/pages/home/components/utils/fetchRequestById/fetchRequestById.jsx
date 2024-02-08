// Function to fetch a request by ID
export const fetchRequestById = async (token, idProject, setSingleRequest) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/${idProject}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
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
        } else {
            console.log("An unexpected error occurred: " + response.status);
        }
    } catch (error) {
        console.log("Error fetching the request:", error);
    }
};