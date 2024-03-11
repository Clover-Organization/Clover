import React, { useEffect, useRef, useState } from "react";
import "../../style/style.css";
import { Button } from "@/components/ui/button";
import { GitCompareArrows, Users, Blocks } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeIntro = () => {
	return (
		<section className="text-secondary-foreground py-20 px-6 md:px-12 h-screen">
			<div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
				<h1 className="text-7xl font-bold mb-8">
					Be clever.
					<span className="text-transparent bg-clip-text bg-gradient-to-br from-lime-400 to-emerald-500">
						{" "}
						Use Clover.
					</span>
				</h1>
				<p className="text-xl mb-8">
					Unlock your coding potential effortlessly with Clover. where
					versioning becomes intuitive and coding becomes a breeze for
					programming learners
				</p>
				<div className="btnTxt">
					<Link to={"/auth/register"}>
						<button className="animated-button">
							<svg
								viewBox="0 0 24 24"
								className="arr-2"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
							</svg>
							<span className="text">Get Started</span>
							<span className="circle"></span>
							<svg
								viewBox="0 0 24 24"
								className="arr-1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
							</svg>
						</button>
					</Link>
				</div>
			</div>
			<div class="flex flex-wrap justify-center items-center mt-10 sm:mt-20 md:mt-32 lg:mt-44 gap-8">
				<div class="bg-secondary p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-primary">
					<GitCompareArrows class="text-primary mb-4" />
					<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
						Version Control Made Easy
					</h3>
					<p class="leading-7 mt-6">
						Seamlessly manage your code versions with Clover's intuitive
						interface
					</p>
				</div>
				<div class="bg-secondary p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-primary mt-4 sm:mt-0">
					<Users class="text-primary mb-4" />
					<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
						Effortless Collaboration
					</h3>
					<p class="leading-7 mt-6">
						Work together on projects seamlessly, ensuring smooth teamwork
					</p>
				</div>
				<div class="bg-secondary p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-primary mt-4 md:mt-0">
					<Blocks class="text-primary mb-4" />
					<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
						Learning Made Fun
					</h3>
					<p class="leading-7 mt-6">
						Embark on your coding journey and enjoy the learning process
					</p>
				</div>
			</div>
		</section>
	);
};

export default WelcomeIntro;
