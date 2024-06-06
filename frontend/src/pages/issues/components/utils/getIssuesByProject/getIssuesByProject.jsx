export const getAllIssuesByProject = async (token, setIssues, idProject, setLoading) => {
    setLoading(true);
    const response = await fetch(`http://localhost:8080/issues/all/${idProject}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    setIssues(data);
    setLoading(false);
}