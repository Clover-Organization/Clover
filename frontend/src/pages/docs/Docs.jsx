import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Navbar from "../components/Navbar";
import AsideNavDocs from "./components/asideNav/AsideNavDocs";
import { useTranslation } from "react-i18next";

const Docs = () => {
	const { t } = useTranslation();
	const selected = 1;
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
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
							{t("docs.introduction.title")}
						</h1>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							{t("docs.introduction.description.line1")}
						</p>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							{t("docs.introduction.description.line2")}
						</p>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							{t("docs.introduction.description.line3")}
						</p>

						<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							{t("docs.problem.title")}
						</h2>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							{t("docs.problem.description.line1")}
						</p>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							{t("docs.problem.description.line2")}
						</p>
						<p className="leading-7 [&:not(:first-child)]:mt-6">
							{t("docs.problem.description.line3")}
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Docs;
