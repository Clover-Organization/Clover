import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";

const AnnotationPreview = () => {
    return (
        <main className="main-annotation-content">
            <section className="section-annotation-content">
                <aside>
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
                                    <div className='text-center'>
                                        <SheetTitle>Create a new annotation!</SheetTitle>
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </aside>
                <article className="article-annotation-content">

                    <>
                        <div className="grid text-center">
                            <CardTitle>Create a new note or open one!</CardTitle>
                            <CardDescription>Document your code, add reference links as if you were using Word</CardDescription>
                            <Separator className="my-4" />
                            <Button>Create new Annotation</Button>
                        </div>
                    </>
                </article>
            </section>
        </main>
    )
}

export default AnnotationPreview;