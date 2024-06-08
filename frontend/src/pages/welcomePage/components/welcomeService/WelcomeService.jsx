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
} from "lucide-react";
import RoadMap from "@/pages/roadmap/RoadMap";
import RoadmapPreview from "@/pages/docs/components/roadmap/components/roadmapPreview/RoadmapPreview";
import { Card } from "@/components/ui/card";
import ProjectPreview from "@/pages/docs/components/versioning/projectPreview/ProjectPreview";
import FileEditorPreview from "./components/fileEditorPreview/FileEditorPreview";

const WelcomeService = () => {
	const [selectedTab, setSelectedTab] = useState("Projects");

	return (
		<section className="h-screen w-full py-12 md:py-24 lg:py-32">
			<div className="container">
				<div className="flex flex-wrap justify-center items-center">
					<div className="">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							<span className="text-white">
								Explore some of the features of{" "}
							</span>
							Clover
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
								<HomeIcon className="w-5 h-5" />
								<span className="font-medium">
									Build Projects
								</span>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 p-3">
								<div className="text-sm grid gap-2 leading-loose">
									<p>
										Clover provides a sanctuary for
										developers of all skill levels to
										nurture their coding ambitions. With its
										sleek and minimalist design, our editor
										offers a distraction-free environment
										where you can focus solely on your code.
										Whether you're crafting a simple script
										or architecting a complex application,
										Clover empowers you to bring your ideas
										to fruition with precision and clarity.
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="chat">
							<AccordionTrigger
								className="flex items-start gap-2 p-3"
								onClick={() => setSelectedTab("Editor")}
							>
								<MessageCircleIcon className="w-5 h-5" />
								<span className="font-medium">
									Clover Editor
								</span>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 p-3">
								<div className="text-sm grid gap-2 leading-loose">
									<p>
										Clover Editor is highly customizable!
										From themes and syntax highlighting to
										keyboard shortcuts and layout, mold your
										coding environment to reflect your style
										and optimize your productivity. Whether
										you prefer a dark-themed interface for
										late-night coding sessions or a
										light-themed one for clarity during the
										day, the choice is yours.
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="calendar">
							<AccordionTrigger
								className="flex items-start gap-2 p-3"
								onClick={() => setSelectedTab("Roadmaps")}
							>
								<CalendarIcon className="w-5 h-5" />
								<span className="font-medium">
									Clover Roadmaps
								</span>
							</AccordionTrigger>
							<AccordionContent className="grid gap-4 p-3">
								<div className="text-sm grid gap-2 leading-loose">
									<p>
										With Clover Roadmaps, clarity and
										direction are at your fingertips.
										Whether you're a novice eager to explore
										the fundamentals or a seasoned developer
										aiming to master advanced concepts, our
										comprehensive roadmaps provide a clear
										route to success. From learning the
										basics of HTML and CSS to diving deep
										into machine learning algorithms, each
										roadmap is meticulously crafted to help
										you achieve your goals.
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<div className="border dark:border-gray-800 w-full sm:w-[800px] ">
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
