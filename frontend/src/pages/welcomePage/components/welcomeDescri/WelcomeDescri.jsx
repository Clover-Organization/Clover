import React from "react";
import "../../style/style.css";
import AboutImg from "./assets/AboutImg.png";
import iconBalanca from "./assets/iconBalanca.png";
import { GitCompareArrows, Users, Blocks } from "lucide-react";

const WelcomeDescri = () => {
	return (
		<section className="container w-full h-screen">
			<div className="flex flex-wrap justify-center items-center mt-10 sm:mt-20 md:mt-32 lg:mt-44 gap-8">
				<div className="">
					<h3 className="text-3xl md:text-4xl font-bold">
						<span>
							Transform the Way You Manage Your Code and
							Collaborate
						</span>
					</h3>
					<h4 className="text-2xl font-light opacity-70">
						<span>
							Discover innovative tools to enhance your workflow
							and productivity
						</span>
					</h4>
				</div>
			</div>
			<div className="flex flex-wrap justify-center items-center mt-16 gap-8">
				<div className="p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border">
					<GitCompareArrows className="text-primary mb-4" />
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
						Version Control Made Easy
					</h3>
					<p className="leading-7 mt-6">
						Seamlessly manage your code versions with Clover's
						intuitive interface
					</p>
				</div>
				<div className="p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border mt-4 sm:mt-0">
					<Users className="text-primary mb-4" />
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
						Effortless Collaboration
					</h3>
					<p className="leading-7 mt-6">
						Work together on projects seamlessly, ensuring smooth
						teamwork
					</p>
				</div>
				<div className="p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border mt-4 md:mt-0">
					<Blocks className="text-primary mb-4" />
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
						Learning Made Fun
					</h3>
					<p className="leading-7 mt-6">
						Embark on your coding journey and enjoy the learning
						process
					</p>
				</div>
			</div>
		</section>
	);
};

export default WelcomeDescri;
