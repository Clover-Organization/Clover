import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const { t } = useTranslation();

	const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<div className="flex items-center justify-between">
			<div>
				<h4 className="text-lg font-medium">{t("navbar.theme.placeholder")}:</h4>
			</div>
			<div>
				<Button onClick={toggleTheme} variant="outline" className="w-[120px]">
					<span>
						{theme === "dark" ? (
							<Moon className="h-4 w-4 mr-2 text-primary animate-fadeIn" />
						) : (
							<Sun className="h-4 w-4 mr-2 text-primary animate-fadeIn" />
						)}
					</span>
					{theme === "dark" ? t("navbar.theme.dark") : t("navbar.theme.light")}
				</Button>
			</div>
		</div>
	);
}
