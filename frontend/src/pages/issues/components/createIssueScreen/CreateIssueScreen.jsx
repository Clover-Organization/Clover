import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/pages/components/Navbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Asterisk, Loader2 } from "lucide-react";
import { createIssue } from "../utils/createIssue/createIssue";
import SelectMultFile from "./components/SelectMult/SelectMult";
import { getAllFilesByProject } from "./components/utils/getAllFilesByProject/getAllFilesByProject";


const CreateIssueScreen = () => {

    const { idProject } = useParams();
    const token = localStorage.getItem("token");
    const [issues, setIssues] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const handleCreateIssue = async () => {
        await createIssue(token, idProject, issues, setLoading, setIssues);
    }

    useEffect(() => {
        getAllFilesByProject(token, idProject, setFiles);
    }, [token, idProject]);


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
                                <CardTitle>Create</CardTitle>
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
                                        value={issues.title}
                                        onChange={(e) => setIssues({ ...issues, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-4">
                                    <div className="flex items-center">
                                        <Label>Description</Label>
                                        <Asterisk color="#dd1f1f" width={18} />
                                    </div>
                                    <Textarea className="h-72"
                                        value={issues.description}
                                        onChange={(e) => setIssues({ ...issues, description: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <SelectMultFile files={files}/>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-12 px-6 py-4 flex flex-wrap justify-end gap-4">
                                {loading ?
                                    <Button disabled className="w-36">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button> :
                                    <Button className="w-36" onClick={() => handleCreateIssue()}>Save</Button>
                                }
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