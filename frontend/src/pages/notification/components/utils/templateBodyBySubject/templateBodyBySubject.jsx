import { Button } from "@/components/ui/button";
import { CardContent, } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const templateBodyBySubject = (subject, utils) => {
    switch (subject.toLowerCase()) {
        case "project_share":
            return (
                <CardContent>
                    <Link to={utils[0]}>
                        <Button className="w-full">Accept invite</Button>
                    </Link>
                </CardContent>
            );
    }
}