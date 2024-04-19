import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createFile } from "../utils/createFile/createFile";

const CreateFile = ({ close, idProject, idFolder }) => {
    const token = localStorage.getItem('token');
    const [fileName, setFileName] = useState("");

    const handleCreateFile = async () => {
        await createFile(fileName, token, idProject, idFolder);
        close();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create file</CardTitle>
                <CardDescription>
                    Give your file a name corresponding to the language you want to program in
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Label htmlFor="file">File</Label>
                <Input
                    type="text"
                    placeholder="File.txt"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </CardContent>

            <CardFooter className="flex justify-end gap-5">
                <Button variant="destructive" onClick={() => close()}>Cancel</Button>
                <Button onClick={() => handleCreateFile()}>Create</Button>
            </CardFooter>
        </Card>
    )
}

export default CreateFile;