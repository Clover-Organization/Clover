import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Docs = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Docs</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <Link href="#" className="font-semibold text-primary">
                            Introduction
                        </Link>
                        <Link to={"/docs/structure"}>Structure</Link>
                    </nav>
                    <div className="grid">
                        <CardHeader>
                            <CardTitle>Introduction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-lg">
                                The Clover software was created based on the difficulties faced by programmers in the code versioning process. Through research, it is clear that many users face difficulties in learning and dealing with the complexities of GitHub, especially due to lack of time. For this reason, Clover was developed, with the aim of simplifying this experience.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                The goal of the project is to offer a more accessible and intuitive platform, allowing users to feel directed when navigating and versioning projects, rather than worrying about the complexities of versioning. Through it, tasks that were previously complicated and took a lot of time become simpler and more accessible.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                With a clean and friendly interface, it facilitates code sharing and promotes a more efficient project experience. Its purpose is to save users time and effort, allowing them to achieve their development goals more easily.
                            </CardDescription>

                            <Accordion type="single" collapsible className="w-full pt-8">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Versioning</AccordionTrigger>
                                    <AccordionContent>
                                        The project versioning was built using a NoSQL database MongoDB alongside JavaSpring for the versioning logic.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>The design</AccordionTrigger>
                                    <AccordionContent>
                                        The design was developed using the shadcn library alongside Tailwind, leveraging React + Vite. This combination resulted in a simple and intuitive interface, enhancing the overall user experience.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </CardContent>
                        <CardHeader>
                            <CardTitle>Problem identification and consequences</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-lg">
                                Code versioning is an essential step in software development, allowing developers to track changes made to a project over time. However, despite the importance of this practice, many developers face significant challenges when dealing with the complexities of code versioning, especially on platforms like GitHub.
                            </CardDescription>
                        </CardContent>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Docs;