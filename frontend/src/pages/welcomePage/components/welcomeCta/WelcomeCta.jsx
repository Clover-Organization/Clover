import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WelcomeCta = () => {

	const { t } = useTranslation();
	
	return (
		<section className="w-full py-10 md:py-20 lg:py-26">
			<div className="container flex flex-col items-center gap-6 rounded-lg border bg-accent/50 p-6 text-center md:rounded-xl md:p-12">
				<div className="space-y-4 p-6">
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
					{t("welcome.cta.title")}
					</h2>
					<p className="!mb-0 font-light opacity-70">
					{t("welcome.cta.description")}
					</p>
					<div className="flex justify-center gap-4">
						<Button className="w-fit" asChild>
							<Link to="/auth/register">{t("welcome.cta.buttons.getStarted")}</Link>
						</Button>
						<Button className="w-fit" variant="link" asChild>
							<Link to="/docs">{t("welcome.cta.buttons.learn")}</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WelcomeCta;
