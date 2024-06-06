import { url } from "@/infra/url";

// Fetch requests from the server
export const fetchRequestsPage = async (currentPage, setLoading, token, setToolBoxes, setRequestsLoaded) => {
    const size = 15;

    try {
        setLoading(true);
        const response = await fetch(`${url}/projects?page=${currentPage}&size=${size}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();

            if (Array.isArray(responseData.content)) {
                // Map the requests and include user data
                const updatedToolBoxes = responseData.content.map(box => {
                    return {
                        ...box,
                        user: box.user,
                    };
                });

                setToolBoxes(updatedToolBoxes);
                setRequestsLoaded(true);
            } else {
                console.error("Response does not contain a valid array:", responseData);
            }
        }
    } catch (error) {
        console.log("Error fetching requests:", error);
        // alert("Error fetching requests. Please try again later.");
    } finally {
        setLoading(false);
    }
};