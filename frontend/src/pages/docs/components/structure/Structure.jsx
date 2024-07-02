import { useTheme } from "@/components/theme-provider";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Navbar from "@/pages/components/Navbar";
import AsideNavDocs from "../asideNav/AsideNavDocs";
import { useTranslation } from "react-i18next";

const Structure = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const selected = 2;
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
								{t("docs.structure.title")}
							</h1>
							<p className="text-lg leading-7 mt-6">
								{t("docs.structure.description")}
							</p>

							<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
								{t("docs.structure.techs.frontend.title")}
							</h2>

							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.frontend.description.line1"
								)}
							</p>
							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.frontend.description.line2"
								)}
							</p>
							<div className="flex justify-center gap-10 mb-6">
								<div className="grid place-items-center gap-5">
									<p className="mt-6 text-lg font-semibold">
										React
									</p>
									<img
										src={`https://skillicons.dev/icons?i=react&theme=${theme}`}
										alt="react"
										width={120}
									/>
								</div>
								<div className="grid place-items-center gap-5">
									<p className="mt-6 text-lg font-semibold">
										Vite
									</p>
									<img
										src={`https://skillicons.dev/icons?i=vite&theme=${theme}`}
										alt="vite"
										width={120}
									/>
								</div>
								<div className="grid place-items-center gap-5">
									<p className="mt-6 text-lg font-semibold">
										Tailwind
									</p>
									<img
										src={`https://skillicons.dev/icons?i=tailwind&theme=${theme}`}
										alt="vite"
										width={120}
									/>
								</div>
							</div>

							<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
								{t("docs.structure.techs.backend.title")}
							</h2>
							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.backend.description.line1"
								)}
							</p>
							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.backend.description.line2"
								)}
							</p>
							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.backend.description.line3"
								)}
							</p>
							<div className="flex justify-center gap-10 mb-6">
								<div className="grid place-items-center gap-5">
									<p className="mt-6 text-lg font-semibold">
										Java
									</p>
									<img
										src={`https://skillicons.dev/icons?i=java&theme=${theme}`}
										alt="java"
										width={120}
									/>
								</div>
								<div className="grid place-items-center gap-5">
									<p className="mt-6 text-lg font-semibold">
										Spring
									</p>
									<img
										src={`https://skillicons.dev/icons?i=spring&theme=${theme}`}
										alt="spring"
										width={120}
									/>
								</div>
							</div>

							<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
								{t("docs.structure.techs.database.title")}
							</h2>
							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.database.description.line1"
								)}
							</p>
							<p className="text-lg leading-7 mt-6">
								{t(
									"docs.structure.techs.database.description.line2"
								)}
							</p>
							<div className="flex justify-center gap-10 mb-6">
								<div className="grid place-items-center gap-5">
									<p className="mt-6 text-lg font-semibold">
										MongoDB
									</p>
									<img
										src={`https://skillicons.dev/icons?i=mongo&theme=${theme}`}
										alt="mongoDB"
										width={120}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Structure;
