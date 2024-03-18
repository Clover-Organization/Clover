import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const ProfileMenu = ({ userData, idProject }) => {
    const navigate = useNavigate('/')
    const handleLogouUser = () => {
        toast.success("Sucess!", {
            description: "Logout Successfully!",
        });
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/welcome');
    }
    return (
        <Menubar className="cursor-pointer">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">Settings</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem className="gap-5 cursor-pointer">
                        <img
                            width={40}
                            className="rounded-full h-10"
                            src={
                                userData.profileImage
                                    ? `data:image/png;base64,${userData.profileImage}`
                                    : "null"
                            }
                            alt="userImage"
                        />
                        <h1>{userData.username}</h1>
                    </MenubarItem>
                    <MenubarSeparator />
                    <Link to={"/Settings"}>
                        <MenubarItem inset className="cursor-pointer text-secondary-foreground">
                            Edit...
                        </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    {idProject && (
                        <>
                            <Link to={`/settings/${idProject}`}>
                                <MenubarItem inset className="cursor-pointer text-secondary-foreground">
                                    Project
                                </MenubarItem>
                            </Link>
                            <MenubarSeparator />
                        </>
                    )}
                    <MenubarItem inset className="cursor-pointer" onClick={() => handleLogouUser()}>Logout</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default ProfileMenu