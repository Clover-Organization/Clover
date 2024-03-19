import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/pages/home/components/utils/getAllUsers/getAllUsers';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Loader2 } from 'lucide-react';
import { ProjectSharing } from '../utils/ProjectSharing';

const ShareProjectComp = ({
    dataShareProject,
    setDataShareProject,
    close,
    token,
    loading,
    setLoading,
    idProject
}) => {
    const [userData, setUserData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        handleGetAllUsers();
    }, [currentPage]);

    const handleGetAllUsers = async () => {
        await getAllUsers(token, setUserData, currentPage);
        setFilteredUsers(userData); // Atualiza os usuários filtrados com base na nova página
    };

    const handleShareProject = async () => {
        setLoading(true);
        await ProjectSharing(token, dataShareProject);
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setDataShareProject({ ...dataShareProject, usernameOrEmail: value, idProject });

        // Filtra os usuários com base no valor inserido no campo de entrada
        const filteredUsers = userData.filter((user) =>
            user.username.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filteredUsers);
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Share Project</CardTitle>
                <CardDescription>Enter your email or username so that the project can be shared.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email or username</Label>
                            <Input id="projectName" placeholder="Email or username"
                                value={dataShareProject.usernameOrEmail}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => close()}>Cancel</Button>
                {!loading ? (
                    <Button onClick={handleShareProject}>Share</Button>
                ) : (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                )}
            </CardFooter>
            <CardContent className={"w-full grid place-items-center"}>
                {filteredUsers.slice(0, 5).map((user, index) => (
                    <Table key={index} className="w-full flex items-center justify-center rounded-md border gap-2 ">
                        <TableBody className="w-full">
                            <TableRow className="cursor-pointer" onClick={() => setDataShareProject({ ...dataShareProject, usernameOrEmail: user.email })}>
                                <TableCell className="w-50">
                                    <Avatar>
                                        <AvatarImage src={`data:image/jpeg;base64,${user.profileImage}`} alt="" width={100} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="w-full">
                                    <div>{user.username}</div>
                                    <div>{user.email}</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                ))}
            </CardContent>
        </Card>
    )
}

export default ShareProjectComp;
