import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import AsideNavDocs from "../asideNav/AsideNavDocs";
import Navbar from "@/pages/components/Navbar";
import AnnotationPreview from "./annotationPreview/AnnotationPreview";

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
						<div>
							<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
								Annotations
							</h1>
							<p className="text-lg leading-7 mt-6">
								Our note-taking interface has been designed
								specifically for those who value keeping their
								project documentation up-to-date, offering a
								variety of configurations for annotations to
								ensure that users feel comfortable writing about
								their code.
							</p>
							<p className="text-lg leading-7 mt-6">
								With customizable settings tailored to
								individual preferences, our interface empowers
								users to annotate their code effortlessly,
								fostering a sense of comfort and ease in
								documenting their projects. Whether it's
								highlighting key concepts, jotting down
								implementation details, or providing
								explanations for future reference, our
								note-taking tool provides a seamless and
								intuitive experience for users to capture their
								thoughts and insights directly within their
								codebase.
							</p>
							<p className="text-lg leading-7 mt-6">
								By prioritizing user comfort and usability, our
								note-taking interface serves as a valuable
								companion for developers, enabling them to
								maintain comprehensive documentation and enhance
								collaboration within their projects.
							</p>
						</div>
                        <Card className="mt-10">
							<AnnotationPreview />
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AnnotationDocs;
