export const getAllNotificationsByUser = async (token, setNotifications) => {
    const response = await fetch(`http://localhost:8080/notification/user/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            setNotifications(data);
        })
        .catch((err) => console.log(err));
}