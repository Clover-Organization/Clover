export const createIssue = async (token, idProject, issue, setLoading) => {
    setLoading(true);
    const response = await fetch(`http://localhost:8080/issues/create/${idProject}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(issue)
    });
    await response.json();
    setLoading(false);
}