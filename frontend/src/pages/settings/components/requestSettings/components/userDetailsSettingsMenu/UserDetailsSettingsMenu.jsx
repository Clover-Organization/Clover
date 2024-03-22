import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { openModalDelete, openModalUpdate } from "@/pages/home/components/utils/ModalFunctions/ModalFunctions";
import { calculateTimeDifference } from "@/pages/home/components/utils/calculateTimeDifference/CalculateTimeDifference";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const UserDetailsSettingsMenu = ({
    singleRequest,
    fetchProject,
    setEditedRequest,
    editedRequest,
    setModalUpdateIsOpen,
    handleDeleteAction
}) => {
    return (
        <>

            <CardHeader>
                <CardTitle>Project information</CardTitle>
                <CardDescription>See your current project data</CardDescription>
                <Separator className="my-4" />
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Project ID
                    </p>
                    <h2 className="text-sm font-medium leading-none">{singleRequest.idProject}</h2>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Project name
                    </p>
                    <h2 className="text-sm font-medium leading-none">{singleRequest.projectName}</h2>
                </div>

                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Description
                    </p>
                    <h2 className="text-sm font-medium leading-none">{singleRequest.projectDescription}</h2>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Creation date
                    </p>
                    <h2 className="text-sm font-medium leading-none">{calculateTimeDifference(singleRequest.creationDate, true, true, true, false)}</h2>
                </div>
                <Separator className="my-4" />

                <div className='flex gap-4'>
                    <Button variant="outline" onClick={
                        () => openModalUpdate(
                            singleRequest.idProject,
                            fetchProject,
                            setEditedRequest,
                            singleRequest,
                            editedRequest,
                            setModalUpdateIsOpen
                        )}>
                        Update!
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete!</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    project and the data contained in it
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteAction(editedRequest)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </CardContent>
        </>

    )
}

export default UserDetailsSettingsMenu;