import { Button } from "@/components/ui/button";
import { CardContent, } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const templateBodyBySubject = (notification, handleRemoveNotification) => {
    switch (notification.subject.toLowerCase()) {
        case "project_share":
            return (
                <CardContent className="flex justify-center flex-wrap w-full gap-4">
                    <Link to={notification.utils[0]}>
                        <Button className="min-w-40" onClick={() => handleRemoveNotification(notification.idNotification)}>Accept invite</Button>
                    </Link>
                    <Button className="min-w-40" variant="destructive" onClick={() => handleRemoveNotification(notification.idNotification)}>Recuse invite</Button>
                </CardContent>
            );
        case "password_reset":
            return (
                <CardContent className="flex justify-center flex-wrap w-full gap-4">
                    <Button className="min-w-40" variant="destructive" onClick={() => handleRemoveNotification(notification.idNotification)}>OK</Button>
                </CardContent>
            );

    }
}