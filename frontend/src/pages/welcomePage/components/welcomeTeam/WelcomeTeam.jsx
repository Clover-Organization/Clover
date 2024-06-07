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

const teamList = [
	{
		imageUrl:
			"https://media.licdn.com/dms/image/D4E03AQHQcx8kkG6VCQ/profile-displayphoto-shrink_800_800/0/1690566695368?e=1723075200&v=beta&t=IFIVdIZ22tt2TlvCZc_Z353cQb3etpPn2-AzPw7f484",
		name: "Nikolas Melo",
		position: "Frontend Developer",
		socialNetworks: [
			{ name: "Linkedin", url: "http://linkedin.com" },
			{
				name: "GitHub",
				url: "https://github.com/thepokenik",
			},
			{
				name: "Instagram",
				url: "https://www.instagram.com/rgg09z/",
			},
		],
		description:
			"Software developer passionate about Computer Vision and Artificial Intelligence.",
	},
	{
		imageUrl:
			"https://media.licdn.com/dms/image/D4D03AQEXLnU_WIcOVQ/profile-displayphoto-shrink_800_800/0/1716695001036?e=1723075200&v=beta&t=rYX5rNSpl6A30yWX7w44MebjIeNuj49BrR1gR-bi2A8",
		name: "Ryan Gonçalves",
		position: "FullStack Developer",
		socialNetworks: [
			{ name: "Linkedin", url: "http://linkedin.com" },
			{
				name: "GitHub",
				url: "https://github.com/RyanGustavoGoncalves",
			},
			{
				name: "Instagram",
				url: "https://www.instagram.com/incognitoniko/",
			},
		],
		description:
			"Software developer passionate about Java language and backend systems.",
	},
	{
		imageUrl: "https://avatars.githubusercontent.com/u/128411446?v=4",
		name: "Heitor Manoel",
		position: "Frontend Developer",
		socialNetworks: [
			{ name: "Linkedin", url: "http://linkedin.com" },
			{
				name: "GitHub",
				url: "https://github.com/lonelykkj",
			},
			{
				name: "Instagram",
				url: "https://www.instagram.com/h_eitoor/",
			},
		],
		description:
			"Enthusiastic Systems Development student with a passion for programming.",
	},
];

const WelcomeTeam = () => {
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
		<section id="team" className="container w-full h-screen">
			<div className="flex flex-wrap justify-center items-center mt-10 sm:mt-20 md:mt-32 lg:mt-44 gap-8">
				<h2 className="text-3xl md:text-4xl font-bold">
					<span className="text-white">Meet the team behind </span>
					Clover
				</h2>
				<p className="mt-4 mb-10 text-xl text-muted-foreground">
					We are a team of passionate developers who are dedicated to
					creating the best coding experience for you.
				</p>
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
		</section>
	);
};

export default WelcomeTeam;
