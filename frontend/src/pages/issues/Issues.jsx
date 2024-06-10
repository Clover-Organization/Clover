import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Filter, Upload, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllIssuesByProject } from "./components/utils/getIssuesByProject/getIssuesByProject";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { isEmpty } from "lodash";
import { Pagination } from "../notification/components/paginationsNotifications/PaginationNotification";
import SearchIssue from "./components/searchIssue/SearchIssue";

const Issues = () => {
    const { idProject } = useParams();
    const token = localStorage.getItem("token");
    const [issuesData, setIssuesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("creationDate");
    const [filterOpen, setFilterOpen] = useState(""); // Default value for filterOpen
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleGetAllIssues = async () => {
        await getAllIssuesByProject(token, setIssuesData, idProject, setLoading, page, filterBy, setTotalPages, filterOpen);
    }

    useEffect(() => {
        if (token) {
            handleGetAllIssues();
        }
    }, [token, filterBy, page, filterOpen]); // Added filterBy, page, and filterOpen as dependencies

    const filteredNotifications = issuesData.filter(issue => {
        return issue.title.toLowerCase().includes(filter.toLowerCase());
    });

    const handlePreviousPage = () => {
        if (page > 0) {
            const newPage = page - 1;
            setPage(newPage);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            const newPage = page + 1;
            setPage(newPage);
        }
    };

    return (
        <>
            <Navbar idProject={idProject} />

            <main className="grid m-6">
                <div className="mx-auto grid max-w-[75rem] flex-1 auto-rows-max gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
                            Issues
                        </h1>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                            <div className="grid h-full gap-4">
                                <div>
                                    <div className="mb-2 flex justify-between gap-5">
                                        <SearchIssue filter={filter} setFilter={setFilter} setFilterBy={setFilterOpen} handleGetAllIssues={handleGetAllIssues} />
                                        {issuesData.length > 0 && (
                                            <Link to={`/issue/new/${idProject}`}>
                                                <Button size="sm">
                                                    Create new Issue
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                    <Card x-chunk="dashboard-07-chunk-0" className="h-[59vh] max-h-[59vh] overflow-auto">
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <CardTitle>Pending</CardTitle>
                                                <Badge variant="outline" className="ml-auto sm:ml-0">
                                                    {issuesData.length > 0 ? issuesData.length : 0}
                                                </Badge>
                                            </div>
                                            <CardDescription>
                                                All issues that are pending
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-2">
                                            {
                                                loading ? (
                                                    <div className="grid gap-5">
                                                        <div className="flex justify-between">
                                                            <Skeleton className="h-6 w-20" />
                                                            <Skeleton className="h-6 w-20" />
                                                            <Skeleton className="h-6 w-20" />
                                                        </div>
                                                        {Array.from({ length: 8 }).map((_, index) => (
                                                            // Adiciona key ao elemento raiz dentro do map
                                                            <div key={index}>
                                                                <div className="flex justify-between m-2">
                                                                    <Skeleton className="h-8 w-36" />
                                                                    <Skeleton className="h-8 w-44" />
                                                                    <Skeleton className="rounded-full w-10 h-10" />
                                                                </div>
                                                                <Separator />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) :
                                                    filteredNotifications.length > 0 ? (
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Title</TableHead>
                                                                    <TableHead>Description</TableHead>
                                                                    <TableHead>Created by</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {filteredNotifications.map((issue) => (
                                                                    <Link to={`/issue/view/${idProject}/${issue.id}`} key={issue.id} className="contents">
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
                                                                    </Link>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    ) :
                                                        <div className="flex flex-col items-center justify-center text-center p-4">
                                                            <CardTitle className="text-2xl font-bold mb-2">No Issues Found</CardTitle>
                                                            <CardDescription className="text-gray-500 mb-4">
                                                                It looks like there are no issues here yet. Start by creating your first issue!
                                                            </CardDescription>
                                                            <Link to={`/issue/new/${idProject}`}>
                                                                <Button size="lg" className="w-full">
                                                                    Create New Issue
                                                                </Button>
                                                            </Link>
                                                        </div>
                                            }
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="flex justify-center">
                                    <Pagination currentPage={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Issues;
