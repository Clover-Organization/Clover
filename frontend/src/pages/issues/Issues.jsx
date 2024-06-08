import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Upload, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllIssuesByProject } from "./components/utils/getIssuesByProject/getIssuesByProject";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { isEmpty } from "lodash";

const Issues = () => {
    const { idProject } = useParams();
    const token = localStorage.getItem("token");

    const [issuesData, setIssuesData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            getAllIssuesByProject(token, setIssuesData, idProject, setLoading);
        }
        console.log(issuesData);
    }, [token]);

    return (
        <>
            <Navbar idProject={idProject} />

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
                <div className="mx-auto grid max-w-[75rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
                            Issues
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Link to={`/issue/new/${idProject}`}>
                                <Button size="sm">
                                    Create new Issue
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0" className="h-full max-h-[85vh] overflow-auto">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <CardTitle>Pending</CardTitle>
                                        <Badge variant="outline" className="ml-auto sm:ml-0">
                                            {issuesData.length}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        All issues that are pending
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-2">
                                    {
                                        loading ? (
                                            <div className="grid gap-3">
                                                <div className="flex justify-between">
                                                    <Skeleton className="h-6 w-20" />
                                                    <Skeleton className="h-6 w-20" />
                                                    <Skeleton className="h-6 w-20" />
                                                </div>
                                                {Array.from({ length: 8 }).map((_, index) => (
                                                    <>
                                                        <div key={index} className="flex justify-between">
                                                            <Skeleton className="h-6 w-36" />
                                                            <Skeleton className="h-6 w-44" />
                                                            <Skeleton className="h-6 w-36" />
                                                        </div>
                                                        <Separator />
                                                    </>
                                                ))}
                                            </div>
                                        ) :

                                            issuesData.length > 0 ? (
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Title</TableHead>
                                                            <TableHead>Description</TableHead>
                                                            <TableHead>Created by</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {issuesData.map((issue) => (
                                                            <TableRow key={issue.id}>
                                                                <TableCell>{issue.title}</TableCell>
                                                                <TableCell className="max-w-xs truncate">{issue.description}</TableCell>
                                                                <TableCell className="grid place-items-center">
                                                                    {issue.users.profileImage != null && !isEmpty(issue.users.profileImage) ? (
                                                                        <img
                                                                            width={40}
                                                                            className="rounded-full h-10 object-cover"
                                                                            src={`data:image/png;base64,${issue.users.profileImage}`}
                                                                            alt="userImage"
                                                                        />
                                                                    ) : (
                                                                        <User width={40} height={40} />
                                                                    )}

                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            ) :

                                                <h2 className="text-2xl">No issues</h2>
                                    }
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Product Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Status</Label>
                                            <Select>
                                                <SelectTrigger id="status" aria-label="Select status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Active</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
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
                                    <CardTitle>Archive Product</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div></div>
                                    <Button size="sm" variant="secondary">
                                        Archive Product
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button size="sm">Save Product</Button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Issues;