import React from "react";
import "../../style/style.css";
import AboutImg from "./assets/AboutImg.png";
import iconBalanca from "./assets/iconBalanca.png";
import {
	GitCompareArrows,
	Users,
	Blocks,
	ListTodo,
	Route,
	PackageOpen,
	CheckIcon,
} from "lucide-react";

const WelcomeDescri = () => {
	return (
		<section className="h-screen w-full py-12 md:py-24 lg:py-32">
			<div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
				{/* <img
					src="/assets/AboutImg.png"
					width={600}
					height={400}
					alt="Feature Image"
					className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
				/> */}
				<div className="flex flex-col justify-center space-y-4">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Streamlined Collaboration
						</h2>
						<p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							Bring your team together with built-in code review,
							real-time commenting, and seamless version control.
						</p>
					</div>
					<ul className="grid gap-4">
						<li className="flex items-start gap-4">
							<div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
								<CheckIcon className="w-5 h-5" />
							</div>
							<div className="grid gap-1">
								<h3 className="font-medium">
									Collaborative Coding
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Invite team members to review and comment on
									code changes in real-time.
								</p>
							</div>
						</li>
						<li className="flex items-start gap-4">
							<div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
								<CheckIcon className="w-5 h-5" />
							</div>
							<div className="grid gap-1">
								<h3 className="font-medium">
									Seamless Versioning
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Track and manage code changes with built-in
									version control.
								</p>
							</div>
						</li>
						<li className="flex items-start gap-4">
							<div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
								<CheckIcon className="w-5 h-5" />
							</div>
							<div className="grid gap-1">
								<h3 className="font-medium">
									Instant Feedback
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Get immediate feedback on your code with
									automated testing and linting.
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
