import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Navbar from "../components/Navbar";
import { getAllNotificationsByUser } from "./components/utils/getAllNotificationsByUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Notification = () => {
    const token = localStorage.getItem("token");
    const [notifications, setNotifications] = useState([]);

    const handleAllNotifications = async () => {
        await getAllNotificationsByUser(token, setNotifications);
    }

    useEffect(() => {
        handleAllNotifications();
    }, []); // Adicione um array vazio aqui para garantir que useEffect só execute uma vez.

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Notifications</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 ">
                    <div className="grid gap-6">
                        {notifications.length === 0 ? (
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
                                {notifications.map((notification, index) => (
                                    <Card key={index} x-chunk="dashboard-04-chunk-1">
                                        <CardHeader>
                                            <CardTitle>{notification.title}</CardTitle>
                                            <CardDescription>
                                                {notification.message}
                                            </CardDescription>
                                            {notification.body}
                                        </CardHeader>
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
