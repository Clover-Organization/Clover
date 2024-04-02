import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";

const AlertPage = () => {
    return (
        <main className="w-full">
            <div className="grid text-center place-items-center">
                <CardTitle>You shouldn't be here.</CardTitle>
                <CardDescription>Only the administrator of this project can enter here!</CardDescription>
                <Separator className="my-4" />
                <Link to={"/"}>
                    <Button>Return to home</Button>
                </Link>
            </div>
        </main>
    )
}

export default AlertPage;