import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronRight } from 'lucide-react';
import { Aside } from "../asideSettings/Aside";

const AsideResponsive = ({ select, setSelect, idProject, isShare }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" size="icon" className="hover:bg-stone-900"><ChevronRight /></Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <Aside select={select} setSelect={setSelect} idProject={idProject} isShare={isShare} />
            </SheetContent>
        </Sheet>
    )
}

export default AsideResponsive;