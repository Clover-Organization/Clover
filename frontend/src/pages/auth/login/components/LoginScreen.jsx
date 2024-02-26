import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Eye, EyeOff, GithubIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function CardWithForm() {
	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	return (
		<Card className="w-auto md:w-1/4 border border-slate-600 rounded-lg flex flex-col">
			<CardHeader className="gap-5">
				<CardTitle className="text-5xl text-green-500">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Username</Label>
							<Input id="name" placeholder="Enter your username" />
						</div>
						<div className="grid w-full items-center gap-4">
							<Label htmlFor="password">Password</Label>
							<div className="flex items-center space-y-1.5 gap-5">
								<Input
									type={showPassword ? "text" : "password"}
									id="password"
									placeholder="Enter your password"
								/>
								{showPassword ? (
									<EyeOff
										className="cursor-pointer"
										onClick={handleShowPassword}
									/>
								) : (
									<Eye
										className="cursor-pointer"
										onClick={handleShowPassword}
									/>
								)}
							</div>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Link
					to="/auth/register"
					className="text-green-500 hover:text-green-600 underline underline-offset-auto"
				>
					Forgot your password?
				</Link>
				<Button className="bg-green-500 hover:bg-green-600 w-28 ">Sign In</Button>
			</CardFooter>
			<div className="flex items-center justify-center">
				<Separator className="my-3 mx-4 w-auto flex-grow" />
				<span>or sign in with</span>
				<Separator className="my-3 mx-4 w-auto flex-grow" />
			</div>
			<CardFooter className="flex item-center">
				<Button variant="outline" className="mx-auto my-5">
					Google
				</Button>
                <Button variant="outline" className="mx-auto my-5">
					<Github className="mr-2" /> GitHub
				</Button>
			</CardFooter>
		</Card>
	);
}
