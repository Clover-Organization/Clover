import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import user from "../../assets/user.png";
import { useState, useRef } from "react";

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
	firstName: z.string().min(1, {
		message: ""
	}),
	lastName: z.string().min(1, {
		message: ""
	}),
	email: z.string().email({ message: "Invalid email address" }),
	birth: z.date({
		required_error: "Please select a date and time",
		invalid_type_error: "That's not a date!",
	}),
	role: z.string(),

});



export default function LoginScreen() {
	const [profileImage, setProfileImage] = useState(null);
	const inputRef = useRef(null);

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

	function validateFormData(data) {
		
		const userData = FormSchema.parse(data);
		cadastrar(userData)
	};

	const handleImagePreview = () => {
		if (profileImage) {
			return URL.createObjectURL(profileImage);
		}
		return null;
	};

	const getUserFile = async (userImagePath) => {
		const response = await fetch(userImagePath);
		const blob = await response.blob();

		// Extrai o nome do arquivo do caminho
		const fileName = userImagePath.split("/").pop();

		// Cria o objeto File
		const userFile = new File([blob], fileName, { type: blob.type });

		return userFile;
	};

	const cadastrar = async (userData) => {
	
		const userFile = await getUserFile(user);

		const formData = new FormData();
		formData.append("profileImage", profileImage ? profileImage : userFile);

		formData.append(
			"userData",
			new Blob([JSON.stringify(userData)], { type: "application/json" })
		);

		try {
			const response = await fetch("http://localhost:8080/auth/register", {
				method: "POST",
				body: formData,
			});

			if (response.status === 201) {
				toast.success("Sucess!", {
					description: "Sucefully registered!",
				});
			} else if (response.status === 400) {
				const errorData = await response.json();
				const errorArray = [];

				// Mapeia os erros recebidos do backend para um formato mais legível
				for (const fieldName in errorData) {
					const errorMessage = errorData[fieldName];
					errorArray.push({ fieldName, errorMessage });
				}
			} else {
				console.log("Ocorreu um erro inesperado: " + response.status);
			}
		} catch (error) {
			console.log("Erro ao enviar a solicitação:", error);
		}
	};

	return (
		<Card className="border border-slate-300 rounded-lg flex flex-col lg:flex-row space-y-6 lg:space-y-0">
			<CardHeader className="lg:w-1/2">
				<CardTitle className="text-5xl">Register</CardTitle>
				<CardDescription className="py-2">
					Enter your information below to create an account.
				</CardDescription>
				<div className="grid items-center justify-center pt-5">
					<div className="w-44 h-44 flex items-center justify-center  border border-white rounded-full">
						<img
							src={handleImagePreview() || user}
							alt="userImage"
							className="w-40 h-40 object-center rounded-full"
						/>
					</div>
				</div>
				<div className="pt-5">
					<Input
						ref={inputRef}
						id="picture"
						type="file"
						accept="image/*"
						onChange={(e) => setProfileImage(e.target.files[0])}
						className="h-full file:text-primary-foreground file:cursor-pointer file:bg-primary file:hover:bg-primary/90  file:rounded-md file:p-2 file:mr-6 file:font-xs"
					/>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<Form {...form} >
					<form
						onSubmit={form.handleSubmit(validateFormData)}
						className="m-4 lg:flex lg:flex-row lg:gap-4"
					>
						<div className="flex gap-4 p-4">
							<div className="flex flex-col items-start gap-4">
								<FormField
									className="w-full"
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
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
											<FormLabel>Email*</FormLabel>
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
													className="w-max"
													type="password"
													placeholder="Enter your password"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Your password must be at least 8 characters and one special character.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Separator orientation="vertical" className="h-xl" />
							<div className="flex flex-col items-start gap-4 ml-6">
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
											<FormControl>
												<Input
													className="w-max"
													type="text"
													placeholder="Enter your Last Name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="w-full flex flex-col space-y-6">
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
												</FormDescription	>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex align-end justify-end">
										<Button type="submit" >Submit</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
