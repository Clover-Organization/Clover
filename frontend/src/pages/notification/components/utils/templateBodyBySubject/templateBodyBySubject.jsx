import { Button } from "@/components/ui/button";
import { CardContent, } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { removeNotification } from "../removeNotification/removeNotification";

export const templateBodyBySubject = (notification) => {
    const token = localStorage.getItem("token");
    const handleRemoveNotification = async (idNotification) => {
        await removeNotification(token, idNotification)
    }

    switch (notification.subject.toLowerCase()) {
        case "project_share":
            return (
                <CardContent>
                    <Link to={notification.utils[0]}>
                        <Button className="w-full" onClick={() => handleRemoveNotification(notification.idNotification)}>Accept invite</Button>
                    </Link>
                </CardContent>
            );
    }
}