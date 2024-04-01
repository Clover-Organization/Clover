// RequestDetails.jsx

import React from 'react';
import UserPreview from '../userPreview/UserPreview';
import { openModalUpdate } from '../utils/ModalFunctions/ModalFunctions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RequestDetails =
    ({
        singleRequest,
        isExpanded,
        focusDescription,
        handleSomeAction,
        setEditedRequest,
        setModalUpdateIsOpen,
        editedRequest,
        role
    }) => {
        return (
            <>
                {/* <Card className="w-[350px]">
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
                </Card> */}
                {/* <div className="singleRequest">

                        <div>
                            <span>Request ID:</span> {singleRequest.idProject}
                        </div>

                        <div>
                            <span>Name:</span> {singleRequest.projectName}
                        </div>

                        <div style={{ cursor: "pointer" }} onClick={focusDescription}>
                            <span>Description:</span> {isExpanded ? <div className="focusDesc">{singleRequest.projectDescription}</div> : <>[EXTEND]</>}
                        </div>

                        <div className="btnSave">
                            <button onClick={() => openModalUpdate(singleRequest.idProject, handleSomeAction, setEditedRequest, singleRequest, editedRequest, setModalUpdateIsOpen)}>Update!</button>
                        </div>
                    </div> */}
            </>
        );
    };

export default RequestDetails;