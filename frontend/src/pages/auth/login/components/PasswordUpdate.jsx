import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tokenMailForgotPassword } from "../components/utils/tokenMailForgotPassword";
import { tokenCheckAndUpdatePassword } from "../../../home/components/utils/tokenCheckUpdate/TokenCheckAndUpdatePassword";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PasswordSchema = z.object({
	newPassword: z
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
});

export default function PasswordUpdate() {
	const [emailEdit, setEmailEdit] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [newPassword, setNewPassword] = useState("");

	const [tokenDialog, setTokenDialog] = useState(false);
	const [newPasswordDialog, setNewPasswordDialog] = useState(false);
	const [updatePasswordDialog, setUpdatePasswordDialog] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [tokenMailLabel, setTokenMailLabel] = useState("");

	const newPasswordForm = useForm({
		resolver: zodResolver(PasswordSchema),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = newPasswordForm;

	const onSubmit = (data) => {
		verifyToken(data);
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handlePasswordChange = (event) => {
		setNewPassword(event.target.value);
	};

	const handleTokenMailLabelChange = (event) => {
		setTokenMailLabel(event.target.value);
	};

	const sendToken = async () => {
		setButtonLoading(true);
		try {
			const response = await tokenMailForgotPassword(emailEdit);
			if (response.status === 200) {
				setUpdatePasswordDialog(false);
				setTokenDialog(true);
			}
		} catch (error) {
			toast.error("Error", {
				description: "Invalid email",
			});
		} finally {
			setButtonLoading(false);
		}
	};

	const verifyToken = async (data) => {
		const tokenAndMail = {
			token: tokenMailLabel,
			newPassword: data.newPassword,
		};

		const response = await tokenCheckAndUpdatePassword(tokenAndMail);

		if (response.status === 200) {
			setTokenDialog(false);
			setNewPasswordDialog(true);
		} else {
			toast.error("Error", {
				description: "Invalid token",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<a className="cursor-pointer text-green-500 hover:text-green-600 underline underline-offset-auto">
					Forgot your password?
				</a>
			</DialogTrigger>
			{updatePasswordDialog && (
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Update Password</DialogTitle>
						<DialogDescription>
							Enter the username of the account where you want to reset the
							password.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Email:
							</Label>
							<Input
								id="usernameEdit"
								label="Username"
								className="w-max"
								value={emailEdit}
								onChange={(e) => setEmailEdit(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						{!buttonLoading ? (
							<Button onClick={sendToken}>Send Token</Button>
						) : (
							<Button disabled>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</Button>
						)}
					</DialogFooter>
				</DialogContent>
			)}
			{tokenDialog && (
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Update Password</DialogTitle>
						<DialogDescription>
							Enter token to update password
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-6 space-x-4">
								<Label htmlFor="token" className="text-left">
									Token:
								</Label>
								<Input
									type="text"
									id="token"
									placeholder="Enter your Token"
									className="w-max flex-grow"
									value={tokenMailLabel}
									onChange={handleTokenMailLabelChange}
								/>
							</div>
						</div>

						<div className="grid grid-cols-4 items-center gap-6 space-x-4">
							<Label htmlFor="newPassword" className="text-right w-max">
								New Password:
							</Label>

							<div className="flex items-center gap-4">
								<Input
									id="newPassword"
									placeholder="Enter your password"
									type={showPassword ? "text" : "password"}
									className="w-max flex-grow"
									{...register("newPassword")}
								/>

								{showPassword ? (
									<EyeOff
										className="cursor-pointer flex-shrink-0 select-none"
										onClick={handleShowPassword}
									/>
								) : (
									<Eye
										className="cursor-pointer flex-shrink-0 select-none"
										onClick={handleShowPassword}
									/>
								)}
							</div>
						</div>
						{errors.newPassword && (
							<p className=" text-sm text-red-400">
								{errors.newPassword.message}
							</p>
						)}
					</div>
					<DialogFooter>
						<Button onClick={handleSubmit(onSubmit)}>Update</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
}
