import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AsideNavDocs from "../asideNav/AsideNavDocs";
import Navbar from "@/pages/components/Navbar";
import Annotation from "@/pages/annotation/Annotation";

const AnnotationDocs = () => {
    const selected = 4;
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Docs</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <AsideNavDocs selected={selected} />
                    <div className="grid">
                        <CardHeader>
                            <CardTitle>Versioning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-lg">
                                Our note-taking interface has been designed specifically for those who value keeping their project documentation up-to-date, offering a variety of configurations for annotations to ensure that users feel comfortable writing about their code.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                With customizable settings tailored to individual preferences, our interface empowers users to annotate their code effortlessly, fostering a sense of comfort and ease in documenting their projects. Whether it's highlighting key concepts, jotting down implementation details, or providing explanations for future reference, our note-taking tool provides a seamless and intuitive experience for users to capture their thoughts and insights directly within their codebase.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                By prioritizing user comfort and usability, our note-taking interface serves as a valuable companion for developers, enabling them to maintain comprehensive documentation and enhance collaboration within their projects.
                            </CardDescription>
                        </CardContent>
                        <Card>
                            <Annotation />
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AnnotationDocs;