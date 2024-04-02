import React, { useState, useEffect } from 'react';
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
import { ChevronRight, FileText } from 'lucide-react';

const AsideAnnotation = ({
    idProject,
    singleRequest,
    setSelectedAnnotation,
    setNewAnnotationName,
    handleUpdateName,
    newAnnotationName,
    setModalIsOpen
}) => {
    const token = localStorage.getItem('token');

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
                                    <React.Fragment key={annotation.idAnnotation}>
                                        <div onClick={() => setSelectedAnnotation(annotation)} className="text-sm cursor-pointer list-none flex gap-2 items-center">
                                            <FileText width={20} />
                                            <li onDoubleClick={() => { setModalIsOpen(true); setNewAnnotationName({ title: annotation.title, id: annotation.idAnnotation }); }}>{annotation.title}</li>
                                        </div>
                                        <Separator className="my-2" />
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className='text-center'>
                                    <SheetTitle>Create a new annotation!</SheetTitle>
                                </div>
                            )}

                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default AsideAnnotation;
