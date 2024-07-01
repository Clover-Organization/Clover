import React, { useState } from "react";
import {
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
	Accordion,
} from "@/components/ui/accordion";
import {
	HomeIcon,
	MessageCircleIcon,
	CalendarIcon,
	DollarSignIcon,
	Code,
	Map,
	FolderOpen,
} from "lucide-react";
import RoadMap from "@/pages/roadmap/RoadMap";
import RoadmapPreview from "@/pages/docs/components/roadmap/components/roadmapPreview/RoadmapPreview";
import { Card } from "@/components/ui/card";
import ProjectPreview from "@/pages/docs/components/versioning/projectPreview/ProjectPreview";
import FileEditorPreview from "./components/fileEditorPreview/FileEditorPreview";
import { useTranslation } from "react-i18next";

const WelcomeService = () => {
	const [selectedTab, setSelectedTab] = useState("Projects");
	const { t } = useTranslation();

	return (
		<section className="md:h-screen w-full py-12 md:py-24 lg:py-32">
			<div className="container">
				<div className="flex flex-wrap justify-center items-center">
					<div className="">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							<span className="text-foreground">
								{t("welcome.service.title.line1")}{" "}
							</span>
								{t("welcome.service.title.line2")}
						</h2>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-12 md:mt-22 lg:mt-36 gap-8">
					<Accordion
						type="single"
						className="w-full sm:w-[400px]"
						defaultValue="introduction"
					>
						<AccordionItem value="introduction">
							<AccordionTrigger
								className="flex items-start gap-2 p-3"
								onClick={() => setSelectedTab("Projects")}
							>
								<FolderOpen className="w-5 h-5" />
								<span className="font-medium">
									{t("welcome.service.features.project.title")}
								</span>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 p-3">
								<div className="text-sm grid gap-2 leading-loose">
									<p>
										{t("welcome.service.features.project.description")}
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="chat">
							<AccordionTrigger
								className="flex items-start gap-2 p-3"
								onClick={() => setSelectedTab("Editor")}
							>
								<Code className="w-5 h-5" />
								<span className="font-medium">
									{t("welcome.service.features.editor.title")}
								</span>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 p-3">
								<div className="text-sm grid gap-2 leading-loose">
									<p>
										{t("welcome.service.features.editor.description")}
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="calendar">
							<AccordionTrigger
								className="flex items-start gap-2 p-3"
								onClick={() => setSelectedTab("Roadmaps")}
							>
								<Map className="w-5 h-5" />
								<span className="font-medium">
									{t("welcome.service.features.roadmap.title")}
								</span>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 p-3">
								<div className="text-sm grid gap-2 leading-loose">
									<p>
										{t("welcome.service.features.roadmap.description")}
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<div className="border dark:border-gray-800 w-full max-md:hidden">
						<div className="text-center">
							{selectedTab === "Projects" && (
								<Card>
									<ProjectPreview />
								</Card>
							)}
							{selectedTab === "Editor" && (
								<Card>
									<FileEditorPreview />
								</Card>
							)}
							{selectedTab === "Roadmaps" && (
								<Card>
									<RoadmapPreview />
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default WelcomeService;
