import Navbar from "@/pages/components/Navbar";
import AsideNavDocs from "../asideNav/AsideNavDocs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoadMap from "@/pages/roadmap/RoadMap";

const RoadmapDocs = () => {
    const selected = 5;
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
                                We've developed a roadmap interface for career paths in programming, offering diverse pathways such as frontend, backend, and more. Our aim is to assist individuals in navigating the journey towards becoming a professional programmer by providing clear guidance on what to learn and how to progress.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                This roadmap interface serves as a comprehensive guide, outlining the key skills, technologies, and concepts essential for each career path. Whether someone is interested in specializing in frontend development, backend engineering, or exploring other areas such as DevOps or data science, our roadmap offers a structured approach to learning and advancement.
                            </CardDescription>
                            <CardDescription className="text-lg pt-8">
                                By breaking down complex career trajectories into manageable steps, our interface empowers aspiring professionals to set clear goals, track their progress, and make informed decisions about their learning journey. Whether they're just starting out or looking to transition into a new role, our roadmap provides valuable insights and resources to support their growth and development in the field of programming.
                            </CardDescription>
                        </CardContent>
                        <Card>
                            <RoadMap />
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RoadmapDocs;