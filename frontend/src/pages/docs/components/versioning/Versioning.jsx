import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AsideNavDocs from "../asideNav/AsideNavDocs";
import Navbar from "@/pages/components/Navbar";
import ProjectPreview from "./projectPreview/ProjectPreview";

const Versioning = () => {
    const selected = 3;
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
                                The project versioning has been intelligently crafted to meet the demands of comprehensive project versioning. Our smart versioning approach is designed to support not only individual files but also entire directories, ensuring effective management of changes across all levels of granularity.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                This strategy enables our versioning system to handle a wide variety of use cases, from small changes in individual files to large directory restructurings. By capturing and recording changes to files and folders in a granular manner, we ensure complete traceability of changes over time, providing a solid foundation for collaboration and continuous development.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                Furthermore, the robustness of our versioning system allows it to handle projects of any scale, ensuring it is scalable and capable of keeping up with the growth and evolution of our projects over time. This proactive approach to versioning positions us ideally to tackle the challenges of software development and ensure the integrity and cohesion of our projects at all stages of the development lifecycle.
                            </CardDescription>
                        </CardContent>
                        <Card>
                            <ProjectPreview />
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Versioning;