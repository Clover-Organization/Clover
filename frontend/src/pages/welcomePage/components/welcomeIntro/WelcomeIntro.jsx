import React, { useEffect, useRef, useState } from "react";
import "../../style/style.css";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import Spline from "@splinetool/react-spline";
import { GitCompareArrows, Users, Blocks } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./WelcomeIntro.css";

const WelcomeIntro = () => {
	const { t } = useTranslation();
	return (
		<section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 h-screen">
			<div className="text-center lg:text-start space-y-6">
				<main className="text-5xl md:text-6xl font-bold">
					<h1 className="inline">
						<span className="inline ">
							{t("welcome.intro.slogan.line1")}
						</span>
					</h1>{" "}
					<h2 className="inline">
						<span className="inline bg-gradient-to-r from-lime-400 to-emerald-500 text-transparent bg-clip-text">
							{t("welcome.intro.slogan.line2")}
						</span>
					</h2>
				</main>

				<h4 className="text-2xl text-balance font-light opacity-70">
					{t("welcome.intro.description")}
				</h4>

				<div className="space-y-4 md:space-y-0 md:space-x-4">
					<Link to={"/auth/register"}>
						<Button className="w-full md:w-1/3">{t("welcome.intro.buttons.getStarted")}</Button>
					</Link>
					<a
						rel="noreferrer noopener"
						href="https://github.com/Clover-Organization/Clover"
						target="_blank"
						className={`w-full md:w-1/3 ${buttonVariants({
							variant: "outline",
						})}`}
					>
						{t("welcome.intro.buttons.github")}
						<Github className="ml-2 w-5 h-5" />
					</a>
				</div>
			</div>

			<Spline
				className="max-md:hidden"
				scene="https://prod.spline.design/VII16kLioCuRlIlY/scene.splinecode"
			/>

			{/* Shadow effect */}
			<div className="shadow"></div>
		</section>
	);
};

export default WelcomeIntro;
