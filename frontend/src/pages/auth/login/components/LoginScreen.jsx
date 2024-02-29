import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { Link, useNavigate } from "react-router-dom";

export default function CardWithForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await cadastrar();
		limpar();
	};

	const limpar = () => {
		setUsername("");
		setPassword("");
	};

	const cadastrar = async () => {
		const data = {
			username: username,
			password: password,
		};

		try {
			const response = await fetch("http://localhost:8080/auth/login", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const responseJson = await response.json();
				const token = responseJson.token;
				localStorage.setItem("token", token);
				toast.success("Sucess!", {
					description: "Sucefully signed in!",
				});
				navigate("/");
			} else if (response.status === 401) {
				toast.error("Error", {
					description: "Invalid username or password!",
				});
			} else {
				console.log("Ocorreu um erro inesperado: " + response.status);
			}
		} catch (error) {
			console.error("Erro ao enviar a solicitação:", error);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	return (
		<Card className="w-auto md:w-1/4 border border-slate-300 rounded-lg flex flex-col">
			<CardHeader className="gap-5">
				<CardTitle className="text-5xl text-green-500">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5 gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="name"
								placeholder="Enter your username"
								value={username}
								onChange={handleUsernameChange}
							/>
						</div>
						<div className="grid w-full items-center gap-4">
							<Label htmlFor="password">Password</Label>
							<div className="flex items-center space-y-1.5 gap-x-4">
								<Input
									type={showPassword ? "text" : "password"}
									id="password"
									placeholder="Enter your password"
									value={password}
									onChange={handlePasswordChange}
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
						<a
							className="cursor-pointer text-green-500 hover:text-green-600 underline underline-offset-auto"
						>
							Forgot your password?
						</a>
						<Button className="w-28 justify-self-end">Sign In</Button>
					</div>
				</form>
			</CardContent>
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
