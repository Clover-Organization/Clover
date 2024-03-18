import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllUsers } from '@/pages/home/components/utils/getAllUsers/getAllUsers';
import { Loader2 } from 'lucide-react';
import { ProjectSharing } from '../utils/ProjectSharing';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const ShareProjectComp = ({ dataShareProject, setDataShareProject, close, token, loading, setLoading }) => {


    const [userData, setUserData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleGetAllUsers = async () => {
        await getAllUsers(token, setUserData);
    }

    const handleShareProject = async () => {
        setLoading(true);
        await ProjectSharing(token, dataShareProject);
        setLoading(false);
    }


    const handleInputChange = (e) => {
        handleGetAllUsers()
        const { value } = e.target;
        setDataShareProject({ ...dataShareProject, usernameOrEmail: value });

        // Filtra os usuários com base no valor inserido no campo de entrada
        const filteredUsers = userData.filter((user) =>
            user.username.toLowerCase().includes(value.toLowerCase())
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
                            <Label htmlFor="name">Email or Username</Label>
                            <Input id="projectName" placeholder="Email or Username"
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
            <CardContent className={"w-full"}>
                {filteredUsers.map((user, index) => (
                    // Renderizar os usuários filtrados
                    <Table key={index} className="w-full flex items-center justify-center rounded-md border gap-2 ">
                        <TableBody className="w-full">
                            <TableRow onClick={() => setDataShareProject({ usernameOrEmail: user.email })}>
                                <TableCell className="w-50">
                                    <Avatar>
                                        <AvatarImage src={`data:image/jpeg;base64,${user.profileImage}`} alt="" width={100} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="w-full">
                                    {user.username}
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