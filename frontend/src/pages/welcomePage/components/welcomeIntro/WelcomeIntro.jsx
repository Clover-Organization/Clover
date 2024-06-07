import React, { useEffect, useRef, useState } from "react";
import "../../style/style.css";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import Spline from "@splinetool/react-spline";
import { GitCompareArrows, Users, Blocks } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import "./WelcomeIntro.css";

const WelcomeIntro = () => {
	return (
		<section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 h-screen">
			<div className="text-center lg:text-start space-y-6">
				<main className="text-5xl md:text-6xl font-bold">
					<h1 className="inline">
						<span className="inline ">Be clever.</span>
					</h1>{" "}
					<h2 className="inline">
						<span className="inline bg-gradient-to-r from-lime-400 to-emerald-500 text-transparent bg-clip-text">
							Use Clover.
						</span>
					</h2>
				</main>

				<p className="text-xl font-light opacity-70 md:w-10/12 mx-auto lg:mx-0">
					Unlock your coding potential effortlessly with Clover. 
					<br/>
					Where versioning becomes intuitive and coding becomes a breeze for
					programming learners
				</p>
				
				<div className="space-y-4 md:space-y-0 md:space-x-4">
					<Link to={"/auth/register"}>
						<Button className="w-full md:w-1/3">Get Started</Button>
					</Link>
					<a
						rel="noreferrer noopener"
						href="https://github.com/thepokenik/clover"
						target="_blank"
						className={`w-full md:w-1/3 ${buttonVariants({
							variant: "outline",
						})}`}
					>
						Github Repository
						<Github className="ml-2 w-5 h-5" />
					</a>
				</div>
			</div>
	
			{/* <Spline scene="https://prod.spline.design/hwGO6CLjozmoM-zX/scene.splinecode" /> */}

			{/* Shadow effect */}
			<div className="shadow"></div>
		</section>
	);
};

export default WelcomeIntro;