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
						<div>
							<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
								Versioning
							</h1>
							<p className="text-lg leading-7 mt-6">
								The project versioning has been intelligently
								crafted to meet the demands of comprehensive
								project versioning. Our smart versioning
								approach is designed to support not only
								individual files but also entire directories,
								ensuring effective management of changes across
								all levels of granularity.
							</p>
							<p className="text-lg leading-7 mt-6">
								This strategy enables our versioning system to
								handle a wide variety of use cases, from small
								changes in individual files to large directory
								restructurings. By capturing and recording
								changes to files and folders in a granular
								manner, we ensure complete traceability of
								changes over time, providing a solid foundation
								for collaboration and continuous development.
							</p>
							<p className="text-lg leading-7 mt-6">
								Furthermore, the robustness of our versioning
								system allows it to handle projects of any
								scale, ensuring it is scalable and capable of
								keeping up with the growth and evolution of our
								projects over time. This proactive approach to
								versioning positions us ideally to tackle the
								challenges of software development and ensure
								the integrity and cohesion of our projects at
								all stages of the development lifecycle.
							</p>
						</div>
						<div className="mt-10">
							<ProjectPreview />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Versioning;
