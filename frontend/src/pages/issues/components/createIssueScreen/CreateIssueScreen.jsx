import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/pages/components/Navbar";
import { Bird, CornerDownLeft, Rabbit, Turtle } from "lucide-react";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import DescriptionIssue from "../descriptionIssue/DescriptionIssue";

const CreateIssueScreen = () => {

    const { idProject } = useParams();
    const token = localStorage.getItem("token");
    const quillRef = useRef(null);
    const [issueData, setIssueData] = useState({
        title: "",
        description: ""
    });

    const handleChange = (value) => {
        setIssueData({ ...issueData, description: value });
    };

    return (
        <>
            <Navbar idProject={idProject} />

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 ">
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Store Name</CardTitle>
                                <CardDescription>
                                    Used to identify your store in the marketplace.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <Input placeholder="Store Name" />
                                </form>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button>Save</Button>
                            </CardFooter>
                        </Card>
                        <DescriptionIssue />
                    </div>
                </div>
            </main>
        </>
    )
}

export default CreateIssueScreen;