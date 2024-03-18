// RequestForm.jsx

import React from 'react';
import InputField from '../inputField/InputField';
import { handleInputBlur, handleInputFocus } from '../utils/handleInput/HandleInput';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


const RequestForm = ({ formData, setFormData, handleSave, onClose }) => {
    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="projectName" placeholder="Name of your project"
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} />
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
                                    placeholder="Project description"
                                    className="resize-none"
                                    value={formData.projectDescription}
                                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
                    <Button onClick={handleSave}>Deploy</Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default RequestForm;
