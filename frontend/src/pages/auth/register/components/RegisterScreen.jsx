import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleUserRound } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { url } from "@/infra/url";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters.",
		})
		.refine(
			(password) =>
				/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(password),
			{
				message: "Password must contain at least one special character.",
			}
		),
	email: z.string().email({ message: "Invalid email address" }),

	role: z.string(),
});

export default function RegisterScreen() {
	const [profileImage, setProfileImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const inputRef = useRef(null);
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
			firstName: "",
			lastName: "",
			email: "",
			birth: "",
			role: "USER",
		},
	});

	const handleSubmit = form.handleSubmit((data) => {
		const userData = FormSchema.parse(data);
		handleRegister(userData);
	});

	const handleImagePreview = () => {
		if (profileImage) {
			return URL.createObjectURL(profileImage);
		}
		return null;
	};

	const handleRegister = async (userData) => {
		setLoading(true);
		const formData = new FormData();
		formData.append("profileImage", profileImage);

		formData.append(
			"userData",
			new Blob([JSON.stringify(userData)], { type: "application/json" })
		);

		try {
			const response = await fetch(`${url}/auth/register`, {
				method: "POST",
				body: formData,
			});

			if (response.status === 201) {
				toast.success("Sucess!", {
					description: "Successfully registered!",
				});
				navigate("/auth/login");
			} else if (response.status === 400) {
				const errorData = await response.json();
				const errorArray = [];

				for (const fieldName in errorData) {
					const errorMessage = errorData[fieldName];
					errorArray.push({ fieldName, errorMessage });
				}
				toast.error("Error!", {
					description: errorData.message,
				});
				console.log(errorData);
			} else {
				console.log("Error: " + response.status);
			}
		} catch (error) {
			console.log("Error: ", error);
		} finally {
			setLoading(false);
		}
	};

	const handleScriptLoadSuccess = () => {
		console.log("Script carregado com sucesso");
	};

	const handleScriptLoadError = () => {
		console.error("Erro ao carregar o script");
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

	const handleRegisterGoogle = async (token) => {
		setLoading(true);
		try {
			const decoded = decodeToken(token);

			const userData = {
				username: decoded.payload.name,
				firstName: decoded.payload.given_name,
				lastName: decoded.payload.family_name,
				email: decoded.payload.email,
				password: decoded.payload.sub,
				birth: "",
				role: "USER",
			};

			const formData = new FormData();

			formData.append("profileImage", profileImage);

			formData.append(
				"userData",
				new Blob([JSON.stringify(userData)], { type: "application/json" })
			);

			const response = await fetch(
				`${url}/auth/register/google`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.ok) {
				toast.success("Sucess!", {
					description: "Successfully registered! You can now sign in!",
				});
				navigate("/auth/login");
			} else {
				console.log("Error: " + response.status);
				toast.error("Error!", {
					description: "Error while signing in with Google! Try again!",
				});
			}
		} catch (error) {
			console.error("Erro ao decodificar o token:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
			<Card className="flex flex-wrap justify-center items-center">
				<CardHeader>
					<CardTitle className="text-5xl text-green-500">Register</CardTitle>
					<CardDescription className="py-2">
						Enter your information below to create an account.
					</CardDescription>
					<div className="grid items-center justify-center pt-5">
						<div className="w-44 h-44 flex items-center justify-center">
							<div className="w-40 h-40 object-center text-primary">
								{profileImage ? (
									<Avatar className="w-48 h-48 object-center">
										<AvatarImage src={handleImagePreview()} className="object-cover" alt="userImage" />
									</Avatar>
								) : (
									<CircleUserRound className="w-48 h-48 text-secondary-foreground object-center" />
								)}
							</div>
						</div>
					</div>
					<div className="pt-5">
						<Input
							ref={inputRef}
							id="picture"
							type="file"
							accept="image/*"
							onChange={(e) => setProfileImage(e.target.files[0])}
							className="h-full border-none file:text-primary-foreground file:cursor-pointer file:bg-primary file:hover:bg-primary/90  file:rounded-md file:p-2 file:mr-6 file:font-xs"
						/>
					</div>
				</CardHeader>
				<CardContent className="w-full md:w-auto m-5">
					<Form {...form}>
						<form
							onSubmit={handleSubmit}
							className="grid grid-cols-1 md:grid-cols-2 justify-center w-full"
						>
							<div className="grid w-full">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl className="w-full">
												<Input placeholder="Enter your username" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Enter your Email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													className="w-full"
													type="password"
													placeholder="Enter your password"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												<p className="text-left break-words text-wrap md:w-60">
													Your password must be at least 8 characters long and
													contain at least one special character.
												</p>
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-4 md:ml-6 w-full">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input
													className="w-full"
													type="text"
													placeholder="Enter your First Name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl className="w-full">
												<Input
													type="text"
													placeholder="Enter your Last Name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="birth"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date of birth</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl className="w-full">
														<Button
															variant={"outline"}
															className={cn(
																"pl-3 text-left font-normal",
																!field.value && "text-muted-foreground"
															)}
														>
															{field.value ? (
																format(field.value, "PPP")
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) =>
															date > new Date() ||
															date < new Date("1900-01-01")
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Your date of birth is used to calculate your age.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex justify-center items-center gap-2 md:flex">
									<GoogleOAuthProvider
										clientId={
											"194451748874-lhbd66qk23vhbd2dv12gidnef7264do6.apps.googleusercontent.com"
										}
										onScriptLoadSuccess={handleScriptLoadSuccess}
										onScriptLoadError={handleScriptLoadError}
									>
										{!loading ? (
											<GoogleLogin
												type="standard"
												theme="outline"
												shape="round"
												size="large"
												text="signin"
												width={"10px"}
												onSuccess={(credentialResponse) => {
													handleRegisterGoogle(
														credentialResponse.credential,
														credentialResponse.clientId
													);
												}}
												onError={() => {
													toast.error("Error", {
														description:
															"Error while signing in with Google! Try again!",
													});
												}}
												useOneTap
											/>
										) : (
											<Button className="bg-white" disabled>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Please wait
											</Button>
										)}
									</GoogleOAuthProvider>
									or
									{!loading ? (
										<Button type="submit">Register</Button>
									) : (
										<Button disabled>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Please wait
										</Button>
									)}
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
	);
}
