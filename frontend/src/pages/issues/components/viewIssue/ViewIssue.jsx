import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/pages/components/Navbar";
import { getIssueById } from "./components/utils/getIssueById/getIssueById";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { isEmpty } from "lodash";
import { Textarea } from "@/components/ui/textarea";
import { updateIssue } from "./components/utils/updateIssue/updateIssue";
import CloseIssue from "./components/closeIssue/CloseIssue";
import { Badge } from "@/components/ui/badge";


const ViewIssue = () => {
    const { idProject, idIssue } = useParams();
    const token = localStorage.getItem("token");
    const [issueData, setIssueData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingButtonUpdate, setLoadingButtonUpdate] = useState(false);

    useEffect(() => {
        if (token) {
            getIssueById(token, idIssue, setIssueData, setLoading);
        }
    }, [token, idIssue]);

    const handleInputChange = (e) => {
        setIssueData({
            ...issueData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Navbar idProject={idProject} />

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
                <div className="mx-auto grid max-w-[75rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4 h-full">
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
                            Issue view
                        </h1>
                        {issueData.open ?
                            <Badge>Open</Badge>
                            :
                            <Badge variant="destructive">Closed</Badge>
                        }
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                            <div className="grid h-full gap-4">
                                <div>
                                    <Card x-chunk="dashboard-07-chunk-0" className="h-[59vh] max-h-[59vh] overflow-auto">
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <CardTitle>Issues information</CardTitle>
                                            </div>
                                            <CardDescription>
                                                Informations about the issue
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-2">
                                            {
                                                loading ? (
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-4">
                                                            <Label>Title</Label>
                                                            <Skeleton className="h-10 w-full" />
                                                        </div>

                                                        <div className="grid gap-4">
                                                            <Label>Description</Label>
                                                            <Skeleton className="h-72 w-full" />
                                                        </div>
                                                    </div>
                                                ) :
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-4">
                                                            <Label>Title</Label>
                                                            <Input
                                                                name="title"
                                                                value={issueData.title || ""}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>

                                                        <div className="grid gap-4">
                                                            <Label>Description</Label>
                                                            <Textarea
                                                                className="h-72"
                                                                name="description"
                                                                value={issueData.description || ""}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                            }
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-end gap-4">
                                    {loadingButtonUpdate ?
                                        <Button disabled className="w-36">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </Button>
                                        :
                                        <Button className="w-36" onClick={() => updateIssue(
                                            token,
                                            idIssue,
                                            issueData,
                                            setLoadingButtonUpdate,
                                            setIssueData
                                        )}>Save changes</Button>
                                    }
                                    <Link to={`/issues/${idProject}`}>
                                        <Button variant="outline" className="w-36 text-secondary-foreground">Back</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Who sent</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ?
                                        <div className="flex items-center space-x-4">
                                            <Skeleton className="h-[80px] w-[80px] rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                        :
                                        <div className="flex flex-wrap gap-6 items-center w-full">
                                            {issueData.users && issueData.users.profileImage != null && !isEmpty(issueData.users.profileImage) ? (
                                                <img
                                                    className="rounded-full w-[80px] h-[80px] object-cover"
                                                    src={`data:image/png;base64,${issueData.users.profileImage}`}
                                                    alt="userImage"
                                                />
                                            ) : (
                                                <User width={80} height={40} />
                                            )}

                                            <div className="grid">
                                                <span className="text-lg max-w-xs truncate">{issueData.users ? issueData.users.username : ""}</span>
                                                <CardDescription className="max-w-xs truncate">{issueData.users ? issueData.users.email : ""}</CardDescription>
                                            </div>
                                        </div>
                                    }
                                </CardContent>
                            </Card>
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-3 gap-2">
                                            <button>
                                                {/* <Image
                                                    alt="Product image"
                                                    className="aspect-square w-full rounded-md object-cover"
                                                    height="84"
                                                    src="/placeholder.svg"
                                                    width="84"
                                                /> */}
                                            </button>

                                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-07-chunk-5">
                                <CardHeader>
                                    <CardTitle>Close Issue</CardTitle>
                                    <CardDescription>
                                        Close the issue
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CloseIssue
                                        idIssue={idIssue}
                                        token={token}
                                        idProject={idProject}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ViewIssue;
