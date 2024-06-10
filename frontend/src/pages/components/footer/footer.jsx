import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Facebook } from "lucide-react";
import Icon from "@/pages/components/Icon";
import logo from "@/pages/components/assets/PTCC.png";

const Footer = () => {
	return (
		<footer className=" py-6 ">
			<section className="container mx-auto px-4 ">
				<div className="grid gap-6 py-6">
					<div className="flex flex-col gap-6">
						<p className="font-light opacity-70">
							Clover is a website built with React, Java, and
							MongoDB, designed for collaborative code versioning.
						</p>
					</div>
					<div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
						<Link
							to="/privacy-policy"
							className="font-light opacity-70"
						>
							Privacy Policy
						</Link>
						<Link
							to="/terms-of-service"
							className="font-light opacity-70"
						>
							Terms of Service
						</Link>
						<Link
							to="/cookie-policy"
							className="font-light opacity-70"
						>
							Cookie Policy
						</Link>
					</div>
				</div>
				<div className="border-t pt-4 mt-4 flex flex-col md:flex-row md:gap-2 gap-6 justify-between items-center">
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="icon"
							as="a"
							href="https://github.com/thepokenik/clover"
						>
							<Github />
						</Button>
					</div>
					<p className="text-gray-500 text-center md:text-left">
						©{" "}
						<a
							href="https://github.com/thepokenik/clover"
							className="hover:underline"
						>
							Clover
						</a>
						. All rights reserved. 2023-present.
					</p>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
