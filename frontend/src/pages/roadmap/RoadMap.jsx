import React from "react";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RoadMap = () => {
    return (
        <main>
            <Navbar />
            <Card className="w-[350px]">

                <div className="w-full text-center">
                    <CardTitle>HTML</CardTitle>
                </div>

                <CardContent className="text-justify">
                    <CardDescription>HTML é uma linguagem de marcação utilizada na construção de páginas na Web. Documentos HTML podem ser interpretados por navegadores. A tecnologia é fruto da junção entre os padrões HyTime e SGML.</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </main>
    )
}

export default RoadMap;