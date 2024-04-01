//UpdateRequest.jsx

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UpdateRequest =
    ({
        editedRequest,
        singleRequest,
        setEditedRequest,
        handleUpdateAction,
        onClose
    }) => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Update project</CardTitle>
                <CardDescription>Here you can update some basic information about your project.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="projectName"
                                placeholder="Updated project name"
                                value={editedRequest.projectName}
                                onChange={(e) => setEditedRequest((prev) => ({ ...prev, projectName: e.target.value }))} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="projectDescription"
                                placeholder="Update project description"
                                className="resize-none"
                                value={editedRequest.projectDescription}
                                onChange={(e) => setEditedRequest((prev) => ({ ...prev, projectDescription: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
                <Button onClick={() => handleUpdateAction(editedRequest, singleRequest.idProject)}>Update</Button>
            </CardFooter>
        </Card>

    
    )

export default UpdateRequest;