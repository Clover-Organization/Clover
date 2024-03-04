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
import PasswordUpdate from "./PasswordUpdate";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginScreen() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleScriptLoadSuccess = () => {
		console.log("Script carregado com sucesso");
	};

	const handleScriptLoadError = () => {
		console.error("Erro ao carregar o script");
	};

	const navigate = useNavigate();

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await handleLogin();
		clearFields();
	};

	const clearFields = () => {
		setUsername("");
		setPassword("");
	};

	const base64UrlDecode = (str) => {
		const padding = "=".repeat((4 - (str.length % 4)) % 4);
		const base64 = (str + padding).replace(/-/g, "+").replace(/_/g, "/");
		const rawData = atob(base64);
		return rawData;
	};

	const decodeToken = (token) => {
		const [header, payload, signature] = token.split(".");
		const decodedHeader = JSON.parse(base64UrlDecode(header));
		const decodedPayload = JSON.parse(base64UrlDecode(payload));
		return { header: decodedHeader, payload: decodedPayload, signature };
	};

	const handleLogin = async () => {
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
				toast.success("Success!", {
					description: "Successfully signed in!",
				});
				navigate("/");
			} else if (response.status === 401) {
				toast.warning("Error", {
					description: "Invalid username or password!",
				});
			} else {
				console.log("An unexpected error occurred: " + response.status);
				toast.error("Error", {
					description: "Unexpected error! Try again!",
				});
			}
		} catch (error) {
			console.error("Error sending request:", error);
		}
	};

	const handleLoginGoogle = async (token) => {
		const decoded = decodeToken(token);

		const data = {
			username: decoded.payload.name,
			password: decoded.payload.sub,
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
					description: "Successfully signed in!",
				});
				navigate("/");
			} else {
				toast.error("Error", {
					description: "Unexpected error! Try again!",
				});
			}
		} catch (error) {
			console.error("Erro ao enviar a solicitação:", error);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Card className="w-auto border border-slate-300 rounded-lg flex flex-col space-y-6 lg:space-y-0">
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
						<PasswordUpdate />
						<Button className="w-28 justify-self-end">Sign In</Button>
					</div>
				</form>
			</CardContent>
			<div className="flex items-center justify-center">
				<Separator className="my-3 mx-4 w-auto flex-grow" />
				<span>or sign in with</span>
				<Separator className="my-3 mx-4 w-auto flex-grow" />
			</div>
			<CardFooter className="flex item-center justify-center">
				<div className="flex items-center justify-center gap-4 my-6">
					<GoogleOAuthProvider
						clientId={
							"194451748874-lhbd66qk23vhbd2dv12gidnef7264do6.apps.googleusercontent.com"
						}
						onScriptLoadSuccess={handleScriptLoadSuccess}
						onScriptLoadError={handleScriptLoadError}
					>
						<GoogleLogin
							type="standard"
							theme="outline"
							shape="round"
							size="large"
							onSuccess={(credentialResponse) => {
								handleLoginGoogle(
									credentialResponse.credential,
									credentialResponse.clientId
								);
							}}
							onError={() => {
								toast.error("Error", {
									description: "Error while signing in with Google! Try again!",
								});
							}}
							useOneTap
						/>
					</GoogleOAuthProvider>
				</div>
			</CardFooter>
		</Card>
	);
}
