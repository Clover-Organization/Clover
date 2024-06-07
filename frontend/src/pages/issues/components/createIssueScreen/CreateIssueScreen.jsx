import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/pages/components/Navbar";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asterisk, Bird, Rabbit, Turtle } from "lucide-react";
import { createIssue } from "../utils/createIssue/createIssue";


const CreateIssueScreen = () => {

    const { idProject } = useParams();
    const token = localStorage.getItem("token");
    const [issues, setIssues] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    const handleCreateIssue = async () => {
        await createIssue(token, idProject, issues, setLoading);
    }


    return (
        <>
            <Navbar idProject={idProject} />

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">New Issue</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 ">
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Title</CardTitle>
                                <CardDescription>
                                    Make it short and clear
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label>Title</Label>
                                        <Asterisk color="#dd1f1f" width={18} />
                                    </div>
                                    <Input placeholder="Title.."
                                        onChange={(e) => setIssues({ ...issues, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-4">
                                    <div className="flex items-center">
                                        <Label>Description</Label>
                                        <Asterisk color="#dd1f1f" width={18} />
                                    </div>
                                    <Textarea className="h-72"
                                        onChange={(e) => setIssues({ ...issues, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Select File</Label>
                                    <Select>
                                        <SelectTrigger
                                            id="model"
                                            className="items-start [&_[data-description]]:hidden"
                                        >
                                            <SelectValue placeholder="Select a model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="genesis">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Rabbit className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Genesis
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Our fastest model for general use cases.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="explorer">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Bird className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Explorer
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Performance and speed for efficiency.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="quantum">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Turtle className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Quantum
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            The most powerful model for complex
                                                            computations.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-12 px-6 py-4 flex flex-wrap justify-end gap-4">
                                <Button className="w-36">Save</Button>
                                <Link to={`/issues/${idProject}`}>
                                    <Button className="w-36 text-secondary-foreground" variant="outline">Cancel</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CreateIssueScreen;