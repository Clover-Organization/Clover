import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const LanguageToggle = () => {
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState(i18n.language);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setLanguage(lng);
	};

	return (
		<div className="flex items-center justify-between">
			<div>
				<h4 className="text-lg font-medium">
					{t("navbar.placeholder")}:
				</h4>
			</div>
			<div>
				<Select onValueChange={changeLanguage}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder={t("navbar.placeholder")} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="en">
							{t("navbar.english")}
						</SelectItem>
						<SelectItem value="pt">
							{t("navbar.portuguese")}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default LanguageToggle;

{
	/* <div className="flex items-center justify-between">
						<h4 className="text-lg font-medium">Language:</h4>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Language" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="en">English</SelectItem>
								<SelectItem value="pt">Portuguese</SelectItem>
							</SelectContent>
						</Select>
					</div> */
}
