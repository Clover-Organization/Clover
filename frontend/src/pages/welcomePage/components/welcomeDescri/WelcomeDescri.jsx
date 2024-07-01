import React from "react";
import "../../style/style.css";
import { CheckIcon } from "lucide-react";
import LottieAnimation from "./components/lottieAnimation/LottieAnimation";
import { useTranslation } from "react-i18next";

const WelcomeDescri = () => {
	const { t } = useTranslation();

	return (
		<section className="md:h-screen w-full py-32 md:py-64">
			<div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
				<LottieAnimation className="max-md:hidden" />
				<div className="flex flex-col justify-center space-y-4">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							{t("welcome.description.title")}
						</h2>
						<p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							{t("welcome.description.subtitle")}
						</p>
					</div>
					<ul className="grid gap-4">
						<li className="flex items-start gap-4">
							<div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
								<CheckIcon className="w-5 h-5" />
							</div>
							<div className="grid gap-1">
								<h3 className="font-medium">
									{t(
										"welcome.description.features.collaborativeCoding.title"
									)}
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{t(
										"welcome.description.features.collaborativeCoding.description"
									)}
								</p>
							</div>
						</li>
						<li className="flex items-start gap-4">
							<div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
								<CheckIcon className="w-5 h-5" />
							</div>
							<div className="grid gap-1">
								<h3 className="font-medium">
									{t(
										"welcome.description.features.seamlessVersioning.title"
									)}
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{t(
										"welcome.description.features.seamlessVersioning.description"
									)}
								</p>
							</div>
						</li>
						<li className="flex items-start gap-4">
							<div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
								<CheckIcon className="w-5 h-5" />
							</div>
							<div className="grid gap-1">
								<h3 className="font-medium">
									{t(
										"welcome.description.features.instantFeedback.title"
									)}
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{t(
										"welcome.description.features.instantFeedback.description"
									)}
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default WelcomeDescri;
