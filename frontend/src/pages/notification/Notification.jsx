import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar";
import { getAllNotificationsByUser } from "./components/utils/getAllNotificationsByUser/getAllNotificationsByUser";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, X } from "lucide-react";
import HeaderNotification from "./components/headerNotifications/HeaderNotifications";
import { templateBodyBySubject } from "./components/utils/templateBodyBySubject/templateBodyBySubject";
import { removeNotification } from "./components/utils/removeNotification/removeNotification";
import { calculateTimeDifference } from "../home/components/utils/calculateTimeDifference/CalculateTimeDifference";
import { Pagination } from "./components/paginationsNotifications/PaginationNotification";
import { isEmpty } from "lodash";

const Notification = () => {
    const token = localStorage.getItem("token");
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleAllNotifications = async () => {
        await getAllNotificationsByUser(token, setNotifications, page, filterBy, setTotalPages);
    }

    useEffect(() => {
        handleAllNotifications();
    }, [page, filterBy]);

    const filteredNotifications = notifications.filter(notification => {
        return notification.title.toLowerCase().includes(filter.toLowerCase());
    });

    const handleRemoveNotification = async (idNotification) => {
        await removeNotification(token, idNotification);
        handleAllNotifications();
    }

    const handlePreviousPage = () => {
        if (page > 0) {
            const newPage = page - 1;
            setPage(newPage);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            const newPage = page + 1;
            setPage(newPage);
        }
    };


    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] h-full flex-1 flex-col gap-4 p-4 md:gap-2 md:p-10">
                <HeaderNotification notifications={notifications} filter={filter} setFilter={setFilter} filterBy={filterBy} setFilterBy={setFilterBy} handleAllNotifications={handleAllNotifications} />
                <div className="mx-auto grid w-full notification-h max-w-6xl items-start gap-6 border-solid border p-4 rounded-sm">
                    <div className="grid gap-6">
                        {filteredNotifications.length === 0 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>No notifications</CardTitle>
                                    <CardDescription>
                                        You don't have any notifications yet.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ) : (
                            <div className={`grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(200px,_2fr))] gap-4`}>
                                {filteredNotifications.map((notification, index) => (
                                    <Card key={index} x-chunk="dashboard-04-chunk-1" className="shadow-md w-full">
                                        <CardHeader>
                                            {notification.sender && notification.sender.profileImage != null && !isEmpty(notification.sender.profileImage) ? (
                                                <img
                                                    width={110}
                                                    className="rounded-full h-28 object-cover"
                                                    src={
                                                        notification.sender.profileImage
                                                            ? `data:image/png;base64,${notification.sender.profileImage}`
                                                            : "null"
                                                    }
                                                    alt="userImage"
                                                />
                                            ) : (
                                                <User className="w-12 h-12" />
                                            )}
                                            <CardTitle className="text-primary">{notification.title}</CardTitle>
                                            <CardDescription className="flex flex-wrap justify-end md:justify-between">
                                                {notification.message}
                                            </CardDescription>
                                            {calculateTimeDifference(notification.creationDate, true, true, true, false)}
                                        </CardHeader>
                                        {templateBodyBySubject(notification, handleRemoveNotification)}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center h-full">
                        <Pagination currentPage={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Notification;
