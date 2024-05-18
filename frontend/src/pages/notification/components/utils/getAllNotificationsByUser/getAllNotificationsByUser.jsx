import { url } from "@/infra/url";

export const getAllNotificationsByUser = async (token, setNotifications, page, filterBy, setTotalPages) => {
    const response = await fetch(`${url}/notification/user/all?page=${page}&sort=${filterBy}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            setNotifications(data.content);
            setTotalPages(data.totalPages);
        })
        .catch((err) => console.log(err));
}