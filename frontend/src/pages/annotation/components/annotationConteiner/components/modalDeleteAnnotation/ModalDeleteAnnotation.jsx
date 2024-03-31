import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ModalDeleteAnnotation = ({ onClose, handleDeleteAnnotation }) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Are you absolutely sure?</CardTitle>
                <CardDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
                <Button variant="destructive" onClick={() => handleDeleteAnnotation()}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default ModalDeleteAnnotation;