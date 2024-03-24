import React, { useState, useEffect } from 'react';
import file from '../../../projects/assets/fileIcon.png';
import Modal from '../../../components/Modal';
import { updateAnnotation } from '../utils/updateAnnotation/UpdateAnnotation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronRight } from 'lucide-react';

const AsideAnnotation = ({ idProject, singleRequest, setSelectedAnnotation }) => {

    // Recupera o valor de 'count' do localStorage ou define como 0 se não existir
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newAnnotationName, setNewAnnotationName] = useState({
        title: "",
        id: "",
    });

    const token = localStorage.getItem('token');

    const handleUpdateName = async (id) => {
        await updateAnnotation(token, newAnnotationName, id, idProject);
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="link" size="icon" className="hover:bg-stone-900"><ChevronRight /></Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Annotations</SheetTitle>
                        <SheetDescription>
                            Select your note
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-full rounded-md">
                        <div className="p-4">
                            {Array.isArray(singleRequest.annotations) && singleRequest.annotations.length > 0 ? (
                                singleRequest.annotations.map((annotation, index) => (
                                    <>
                                        <div key={annotation.idAnnotation} onClick={() => setSelectedAnnotation(annotation)} className="text-sm cursor-pointer list-none flex gap-2 items-center">
                                            <img src={file} alt="file" />
                                            <li onDoubleClick={() => { setModalIsOpen(true), setNewAnnotationName({ title: annotation.title, id: annotation.idAnnotation }); }}>{annotation.title}</li>
                                        </div>
                                        <Separator className="my-2" />
                                    </>
                                ))
                            ) : (
                                <li>Create a new annotation!</li>
                            )}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            <Modal isOpen={modalIsOpen} onClose={(() => setModalIsOpen(false))}>
                <Card>

                    <CardHeader>
                        <CardTitle>Update annotation name</CardTitle>
                        <CardDescription>Change the name of your note.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project"
                                value={newAnnotationName.title} // Ajuste para acessar a propriedade newTitle
                                onChange={(e) => setNewAnnotationName({ ...newAnnotationName, title: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => setModalIsOpen(false)}>Cancel</Button>
                        <Button onClick={() => handleUpdateName(newAnnotationName.id)}>Save</Button>
                    </CardFooter>

                </Card>
            </Modal>

        </>
    )
}

export default AsideAnnotation;
