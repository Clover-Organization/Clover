import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WelcomeCta = () => {
	return (
		<section className="w-full py-10 md:py-20 lg:py-26">
			<div className="container flex flex-col items-center gap-6 rounded-lg border bg-accent/50 p-6 text-center md:rounded-xl md:p-12">
				<div className="space-y-4 p-6">
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
						Experience Intuitive Collaboration with Clover
					</h2>
					<p className="!mb-0 font-light opacity-70">
						Empower your team to focus on innovation with real-time
						collaborative editing and streamlined version control.
					</p>
					<div className="flex justify-center gap-4">
						<Button className="w-fit" asChild>
							<Link to="/auth/register">Get Started</Link>
						</Button>
						<Button className="w-fit" variant="link" asChild>
							<Link to="/docs">Learn More</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WelcomeCta;
