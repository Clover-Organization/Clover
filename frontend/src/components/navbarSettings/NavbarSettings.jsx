import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { ModeToggle } from "./components/mode-toggle";
import { Settings } from "lucide-react";
import LanguageToggle from "./components/language-toggle";
import { useTranslation } from "react-i18next";

const NavbarSettings = () => {

    const { t } = useTranslation();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings className="w-4 h-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[250px] p-4">
				<div>
					<ModeToggle />
				</div>
				<div className="mt-4">
                    <LanguageToggle />
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default NavbarSettings;
