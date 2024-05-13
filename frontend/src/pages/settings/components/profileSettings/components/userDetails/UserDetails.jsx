import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CircleUserRound } from "lucide-react"
import user from '../../../../assets/user.png';
import { isEmpty } from "lodash"

export default function UserDetails({ userData, openModalUpdateImage, openModalUserUpdate, handleLogouUser, setModalIsOpen, setEditUser, setUserData, handleUpdateUserAction, editUser }) {
    const token = localStorage.getItem('token');
    return (
        <div>
            <div className="px-4 space-y-6 sm:px-6">
                <header className="space-y-2">
                    <div className="flex items-center space-x-3 gap-4">
                        {userData.profileImage != null && !isEmpty(userData.profileImage) ? (
                            <img
                                alt="Avatar"
                                className="rounded-full object-cover aspect-square"
                                height="96"
                                src={userData.profileImage ? `data:image/png;base64,${userData.profileImage}` : user}
                                width="96"
                            />

                        ) : (
                            <CircleUserRound width={96} height={96} />
                        )}
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold">{editUser.username}</h1>
                            <Button onClick={() => openModalUpdateImage()} size="sm">Change photo</Button>
                        </div>
                    </div>
                </header>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    value={editUser.firstName}
                                    onChange={(e) => {
                                        setEditUser((prev) => ({ ...prev, firstName: e.target.value }));
                                    }}
                                />

                            </div>
                            <div>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname"
                                    value={editUser.lastName}
                                    onChange={(e) => {
                                        setEditUser((prev) => ({ ...prev, lastName: e.target.value }));
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={editUser.email} type="email"
                                    onChange={(e) => {
                                        setEditUser((prev) => ({ ...prev, email: e.target.value }));
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="birth">birth</Label>
                                <Input id="birth" value={editUser.birth} type="text"
                                    onChange={(e) => {
                                        setEditUser((prev) => ({ ...prev, birth: e.target.value }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleUpdateUserAction(editUser, token)}>Save</Button>
                    <Button variant="outline" onClick={() => openModalUserUpdate(setModalIsOpen, setEditUser, userData)}>Change password</Button>
                    <Button variant="destructive" onClick={() => handleLogouUser()}>Logout</Button>
                </div>
            </div>
        </div>
    )
}