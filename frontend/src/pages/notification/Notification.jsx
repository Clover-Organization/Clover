import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Navbar from "../components/Navbar";
import { getAllNotificationsByUser } from "./components/utils/getAllNotificationsByUser/getAllNotificationsByUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import HeaderNotification from "./components/headerNotifications/HeaderNotifications";
import { templateBodyBySubject } from "./components/utils/templateBodyBySubject/templateBodyBySubject";

const Notification = () => {
    const token = localStorage.getItem("token");
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("");

    const handleAllNotifications = async () => {
        await getAllNotificationsByUser(token, setNotifications);
    }

    useEffect(() => {
        handleAllNotifications();
    }, []);

    const filteredNotifications = notifications.filter(notification => {
        return notification.title.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] h-full flex-1 flex-col gap-4 p-4 md:gap-2 md:p-10">
                <HeaderNotification notifications={notifications} filter={filter} setFilter={setFilter} />
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
                            <>
                                {filteredNotifications.map((notification, index) => (
                                    <Card key={index} x-chunk="dashboard-04-chunk-1" className="shadow-md w-full">
                                        <CardHeader>
                                            <CardTitle className="text-primary">{notification.title}</CardTitle>
                                            <CardDescription className="flex justify-between">
                                                {notification.message}
                                                <Button variant="icon" className="hover:text-red-700"><X /></Button>
                                            </CardDescription>
                                        </CardHeader>
                                        {templateBodyBySubject(notification.subject, notification.utils)}
                                    </Card>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Notification;
