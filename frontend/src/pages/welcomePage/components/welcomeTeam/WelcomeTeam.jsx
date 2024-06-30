import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const WelcomeTeam = () => {
	const { t } = useTranslation();

	const teamList = [
		{
			imageUrl:
				"https://media.licdn.com/dms/image/D4E03AQHQcx8kkG6VCQ/profile-displayphoto-shrink_800_800/0/1690566695368?e=1723075200&v=beta&t=IFIVdIZ22tt2TlvCZc_Z353cQb3etpPn2-AzPw7f484",
			name: "Nikolas Melo",
			position: t("welcome.team.members.nikolas.role"),
			socialNetworks: [
				{
					name: "Linkedin",
					url: "https://www.linkedin.com/in/nikolas-melo-5743b1258/",
				},
				{
					name: "GitHub",
					url: "https://github.com/thepokenik",
				},
				{
					name: "Instagram",
					url: "https://www.instagram.com/incognitoniko/",
				},
			],
			description: t("welcome.team.members.nikolas.description"),
		},
		{
			imageUrl:
				"https://media.licdn.com/dms/image/D4D03AQEXLnU_WIcOVQ/profile-displayphoto-shrink_800_800/0/1716695001036?e=1723075200&v=beta&t=rYX5rNSpl6A30yWX7w44MebjIeNuj49BrR1gR-bi2A8",
			name: "Ryan Gonçalves",
			position: t("welcome.team.members.ryan.role"),
			socialNetworks: [
				{
					name: "Linkedin",
					url: "https://www.linkedin.com/in/ryangonçalves/",
				},
				{
					name: "GitHub",
					url: "https://github.com/RyanGustavoGoncalves",
				},
				{
					name: "Instagram",
					url: "https://www.instagram.com/rgg09z/",
				},
			],
			description: t("welcome.team.members.ryan.description"),
		},
		{
			imageUrl: "https://avatars.githubusercontent.com/u/128411446?v=4",
			name: "Heitor Manoel",
			position: t("welcome.team.members.heitor.role"),
			socialNetworks: [
				{
					name: "Linkedin",
					url: "https://www.linkedin.com/in/heitor-manoel-465413250/",
				},
				{
					name: "GitHub",
					url: "https://github.com/lonelykkj",
				},
				{
					name: "Instagram",
					url: "https://www.instagram.com/h_eitoor/",
				},
			],
			description: t("welcome.team.members.heitor.description"),
		},
	];

	const socialIcon = (iconName) => {
		switch (iconName) {
			case "Linkedin":
				return <Linkedin size="20" />;

			case "GitHub":
				return <Github size="20" />;

			case "Instagram":
				return <Instagram size="20" />;
		}
	};

	return (
		<section id="team" className="w-full pt-12 md:pt-24 lg:pt-32">
			<div className="container w-full">
				<div className="flex flex-wrap justify-center items-center gap-8">
					<h2 className="text-3xl my-12 font-bold tracking-tighter md:text-4xl/tight">
						<span className="text-foreground">
							{t("welcome.team.title.line1")}{" "}
						</span>
						{t("welcome.team.title.line2")}
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{teamList.map(
							({
								imageUrl,
								name,
								position,
								socialNetworks,
								description,
							}) => (
								<Card
									key={name}
									className=" relative mt-8 flex flex-col justify-center items-center"
								>
									<CardHeader className="mt-8 flex justify-center items-center pb-2">
										<img
											src={imageUrl}
											alt={`${name} ${position}`}
											className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
										/>
										<CardTitle className="text-center">
											{name}
										</CardTitle>
										<CardDescription className="text-primary">
											{position}
										</CardDescription>
									</CardHeader>

									<CardContent className="text-center pb-2">
										<p>{description}</p>
									</CardContent>

									<CardFooter>
										{socialNetworks.map(({ name, url }) => (
											<div key={name}>
												<a
													rel="noreferrer noopener"
													href={url}
													target="_blank"
													className={buttonVariants({
														variant: "ghost",
														size: "sm",
													})}
												>
													<span className="sr-only">
														{name} icon
													</span>
													{socialIcon(name)}
												</a>
											</div>
										))}
									</CardFooter>
								</Card>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WelcomeTeam;
